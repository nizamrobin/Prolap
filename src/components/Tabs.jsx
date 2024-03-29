import Tab from "./Tab";

export default function Tabs() {
  return (
    <ul className="bg-slate-100 flex gap-4 p-2 absolute top-20">
      <Tab value="friends" />
      <Tab value="f1" />
    </ul>
  );
}
