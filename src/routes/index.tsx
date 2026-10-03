import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Belajar Flowchart dari Nol" },
      { name: "description", content: "Belajar flowchart bertahap untuk pemula, sampai paham alur aplikasi pembayaran siswa SMP." },
      { property: "og:title", content: "Belajar Flowchart dari Nol" },
      { property: "og:description", content: "Belajar flowchart bertahap untuk pemula, sampai paham alur aplikasi pembayaran siswa SMP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/belajar/index.html"
      title="Belajar Flowchart"
      className="block h-screen w-full border-0"
    />
  );
}
