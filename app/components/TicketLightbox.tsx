"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const tinymceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

type EditorClientProps = {
  initialValue?: string,
  onChange?: (content: string) => void,
};

const labelColorClasses = [
  "bg-blue-100 text-blue-700",
  "bg-red-100 text-red-700",
  "bg-green-100 text-green-700",
];

function EditorClient({
  initialValue,
  onChange,
}: EditorClientProps) {
  return (
    <Editor
      apiKey={tinymceApiKey}
      initialValue={initialValue}
      tinymceScriptSrc={`https://cdn.tiny.cloud/1/${tinymceApiKey}/tinymce/8/tinymce.min.js`}
      init={{
        height: 300,
        menubar: false,
        plugins: "lists link image table code help wordcount",
        toolbar: "undo redo | formatselect | bold italic emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code",
        toolbar_mode: 'floating',
      }}
      onEditorChange={(content) => {
        onChange?.(content);
      }}
    />
  );
}

function LabelsField({ labels }: { labels: string[] }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-zinc-500">Labels</span>
      </div>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        {labels.map((label, index) => (
          <span
            key={label}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              labelColorClasses[index % labelColorClasses.length]
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </>
  );
}

export default function TicketLightbox() {
  const [title, setTitle] = useState("Come to the Dark Side");
  const [titleDraft, setTitleDraft] = useState("Come to the Dark Side");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionDraft, setDescriptionDraft] = useState("");

  const [comments, setComments] = useState("");
  const [commentsDraft, setCommentsDraft] = useState("");

  const [commentsDraft, setCommentsDraft] = useState("");
  const [submittedComments, setSubmittedComments] = useState<
    Array<{ name: string; content: string }>
  >([]);

  const assignee = "Luke Skywalker";
  const reporter = "Darth Vader";
  const dueDate = "2026-02-15";

  const labels = ["The Force", "The Empire"];

  const handleSaveComment = () => {
    if (commentsDraft.trim()) {
      setSubmittedComments((prev) => [
        ...prev,
        { name: assignee, content: commentsDraft },
      ]);
      setCommentsDraft("");
    }
  };

  return (
    <div className="relative mx-auto flex max-w-5xl items-center justify-center">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-400 bg-white">
        <div className="grid gap-0 md:grid-cols-[1fr_240px]">
          <section className="px-8 py-8">
            <div className="space-y-8">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Title
                </label>
                {isEditingTitle ? (
                  <input
                    className="mt-3 h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 text-base text-zinc-900 focus:outline-none"
                    value={titleDraft}
                    onChange={(event) => setTitleDraft(event.target.value)}
                    onBlur={() => {
                      setTitle(titleDraft.trim());
                      setIsEditingTitle(false);
                    }}
                    autoFocus
                  />
                ) : (
                  <button
                    type="button"
                    className="mt-3 flex h-12 w-full items-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 text-left text-zinc-600"
                    onClick={() => {
                      setTitleDraft(title);
                      setIsEditingTitle(true);
                    }}
                  >
                    {title || "Click to add a title"}
                  </button>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Description
                </label>
                <EditorClient
                  key="description-editor"
                  initialValue={description}
                  onChange={(content) => {
                    setDescriptionDraft(content);
                    setDescription(content);
                  }}
                />
              </div>
              <div className="border-t border-zinc-200 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Activity
                </h3>
                <div className="mt-4">
                  <div className="text-sm font-medium text-zinc-700">
                    Comments
                  </div>
                  <EditorClient
                    key="comments-editor"
                    initialValue={comments}
                    onChange={(content) => {
                      setCommentsDraft(content);
                      setComments(content);
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
          <aside className="border-t border-zinc-200 bg-zinc-50 px-6 py-6 md:border-t-0 md:border-l">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Details
            </h2>
              <ul className="mt-6 space-y-5 text-sm text-zinc-700">
                <li className="flex items-center justify-between gap-3">
                  <span className="text-zinc-500">Assignee</span>
                  <span className="text-right text-zinc-700">{assignee}</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-zinc-500">Reporter</span>
                  <span className="text-right text-zinc-700">{reporter}</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-zinc-500">Due Date</span>
                  <span className="text-right text-zinc-700">{dueDate}</span>
                </li>
              <li>
                <LabelsField labels={labels} />
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
