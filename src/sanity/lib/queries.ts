export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  "id": _id,
  title,
  tagline,
  year,
  role,
  description,
  challenge,
  solution,
  results,
  stack,
  "image": image.asset->url,
  "blurDataURL": image.asset->metadata.lqip,
  demo,
  github
}`;