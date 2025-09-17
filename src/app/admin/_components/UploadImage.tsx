"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/browser";

export default function UploadImage({
  blogId,
  initialUrl,
}: {
  blogId: string;
  initialUrl?: string | null;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop();
    const path = `${blogId}/${Date.now()}.${ext}`;

    const { error: upErr } = await supabase
      .from("blogs"); // warm up auth (optional)

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(path, file, { upsert: true });
    if (error) return alert(error.message);

    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    setUrl(data.publicUrl);

    const { error: updErr } = await supabase
      .from("blogs")
      .update({ image_url: data.publicUrl })
      .eq("id", blogId);
    if (updErr) alert(updErr.message);
  }

  return (
    <div className="space-y-2">
      {url ? (
        <img src={url} alt="cover" className="w-56 rounded" />
      ) : (
        <div className="w-56 h-32 bg-gray-100 rounded" />
      )}
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
}
