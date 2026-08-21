import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("x-changelog-api-key") || req.headers.get("authorization");
    const syncSecret = process.env.CHANGELOG_SYNC_SECRET || process.env.PAYLOAD_SECRET;

    // Check authorization if a secret is defined in environment
    if (syncSecret) {
      const token = authHeader?.replace("Bearer ", "").trim();
      if (!token || token !== syncSecret) {
        return NextResponse.json(
          { error: "Unauthorized. Invalid or missing x-changelog-api-key header." },
          { status: 401 }
        );
      }
    }

    const body = (await req.json()) as Record<string, any>;
    const {
      title,
      version,
      type = "feature",
      app = "all",
      summary,
      gitCommitHash,
      gitCommitMessage,
      releaseDate = new Date().toISOString(),
      status = "published",
    } = body;

    if (!title || !version || !summary) {
      return NextResponse.json(
        { error: "Missing required fields: title, version, summary." },
        { status: 400 }
      );
    }

    // Generate clean slug
    const slug =
      body.slug ||
      `${version.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")}`.replace(/-+/g, "-");

    const payload = await getPayload({ config: configPromise });

    // Check if entry with this slug or commit hash already exists
    const existing = await payload.find({
      collection: "changelog",
      where: {
        or: [
          { slug: { equals: slug } },
          ...(gitCommitHash ? [{ gitCommitHash: { equals: gitCommitHash } }] : []),
        ],
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      // Update existing entry
      const updated = await payload.update({
        collection: "changelog",
        id: existing.docs[0].id,
        data: {
          title,
          version,
          type,
          app,
          summary,
          gitCommitHash,
          gitCommitMessage,
          status,
        },
      });

      return NextResponse.json({
        success: true,
        action: "updated",
        id: updated.id,
        slug: updated.slug,
      });
    }

    // Create new changelog entry
    const created = await payload.create({
      collection: "changelog",
      data: {
        title,
        version,
        slug,
        type,
        app,
        summary,
        releaseDate,
        gitCommitHash,
        gitCommitMessage,
        status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        action: "created",
        id: created.id,
        slug: created.slug,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process changelog sync" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/changelog/sync",
    method: "POST",
    usage: {
      headers: {
        "x-changelog-api-key": "your_CHANGELOG_SYNC_SECRET",
        "Content-Type": "application/json",
      },
      body: {
        version: "v2.6.0",
        title: "Native Shopify Flow Action & Auto-Replier Updates",
        type: "feature",
        app: "business-api",
        summary: "Added instant Judge.me review trigger and automatic WhatsApp order confirmation tagging.",
        gitCommitHash: "a1b2c3d",
      },
    },
  });
}
