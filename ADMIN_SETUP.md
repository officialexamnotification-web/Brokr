# Tradivex Admin Setup

The admin console is intentionally not linked from the public navigation. It is protected by Firebase Email/Password Authentication and a Firestore allowlist.

## One-time Firebase setup

1. In Firebase Console for project `exam-notification-11c40`, enable Authentication → Sign-in method → Email/Password.
2. Create the admin user in Authentication → Users. The email is the admin username; never put the password in the repository or `.env` file.
3. Create a Firestore database if one does not exist.
4. Create this document in Firestore:

   - Collection: `admins`
   - Document ID: the exact admin email, for example `you@example.com`
   - Field: `enabled` = `true` (boolean)

5. Deploy both rules files:

   ```text
   firebase deploy --only firestore:rules,storage
   ```

6. In Storage, confirm the `managed-content` path can be used by the admin user. The rules limit uploads to images under 10 MB.

## Open the panel

Use `/admin/login` on the deployed site. The route is not listed in the public header, footer, sitemap, or robots index. Authentication and the Firestore allowlist are still required; a hidden URL is not treated as security by itself.

## Publishing workflow

- Public `/submit` entries are stored in `toolSubmissions` as `pending-review` once Firebase App Check is configured.
- Admin can convert a submission into a draft tool, complete the missing details, upload an image, and publish it.
- Admin-created tools and blog posts are stored in `managedTools` and `managedBlogs`.
- Only records with `status: "published"` are read by the public site. Drafts stay private.
