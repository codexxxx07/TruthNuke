import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { MOCK_GUIDELINES } from "../data/seedData";
import ActionButton from "../components/common/ActionButton";

const NewContent = () => {
  const { user, role } = useAppContext();
  const [form, setForm] = useState({
    title: "",
    channel: "Blog",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const channels = {
    blog: "Blog",
    internal: "Internal",
    email: "Email",
    social: "Social",
    docs: "Documentation",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newContent = {
        title: form.title,
        channel: form.channel,
        content: form.content,
        status: "pending",
        createdBy: user?.name || "unknown",
        createdAt: new Date().toISOString(),
      };

      const created = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...newContent, id: `c-${Date.now()}` });
        }, 500);
      });

      setToast({
        type: "success",
        message: `Content "${created.title}" submitted successfully`,
        autoDismiss: true,
      });

      setForm({
        title: "",
        channel: "Blog",
        content: "",
      });
    } catch (error) {
      setToast({
        type: "error",
        message: "Failed to submit content. Please try again.",
        autoDismiss: true,
      });
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">New Content</h1>
        <p className="text-muted-foreground">Submit content for AI-assisted review</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-2">Content Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter content title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Channel</label>
          <select
            name="channel"
            value={form.channel}
            onChange={handleChange}
            className="w-full rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {Object.values(channels).map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            name="content"
            rows={6}
            value={form.content}
            onChange={handleChange}
            className="w-full rounded-md border border-border px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Paste your content here..."
            required
          ></textarea>
        </div>

        <div>
          <div className="flex gap-3">
            <ActionButton
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
              text={isSubmitting ? "Submitting..." : "Submit for Review"}
            />
            <ActionButton
              type="secondary"
              text="Clear"
              onClick={() => setForm({ title: "", channel: "Blog", content: "" })}
            />
          </div>
        </div>
      </form>

      {/* Toast area */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-start gap-3 bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm transform transition-transform" style={{ transform: "translateY(0)" }}>
          <p className="font-medium">{toast.message}</p>
          <button
            onClick={() => setToast(null)}
            className="ml-auto text-muted-foreground hover opacity-80"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

/** @jsxImportSource react */
export default NewContent;