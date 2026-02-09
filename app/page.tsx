import TicketLightbox from "./components/TicketLightbox";

const tickets = [
  "AB-101",
  "AB-118",
  "AB-127",
  "AB-134",
  "AB-145",
  "AB-152",
  "AB-163",
  "AB-178",
  "AB-186",
  "AB-193",
  "AB-207",
  "AB-219",
];

function HeaderStub() {
  return (
    <div className="w-full border-b border-zinc-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4 text-zinc-300">
        <div className="text-xl font-semibold uppercase tracking-[0.18em]">
          Ticket Work System
        </div>
        <div className="mx-10 flex-1">
          <div className="flex h-10 w-full items-center rounded-full border border-zinc-200 bg-white/70 px-4 text-sm text-zinc-300">
            Search
          </div>
        </div>
        <div className="ml-auto h-10 w-10 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
          <img
            src="/Luke.png"
            alt="User profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function TicketList() {
  return (
    <div className="mx-auto mt-6 max-w-6xl px-6 text-zinc-300">
      <div className="grid grid-cols-1 gap-3 text-sm font-medium text-zinc-300">
        {tickets.map((ticket) => (
          <span
            key={ticket}
            className="w-full rounded-full border border-zinc-200 bg-white/60 px-4 py-2 text-left"
          >
            {ticket}
          </span>
        ))}
      </div>
    </div>
  );
}

function BackgroundStub() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <HeaderStub />
      <TicketList />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white px-6 py-16 font-sans text-zinc-900">
      <BackgroundStub />
      <TicketLightbox />
    </div>
  );
}
