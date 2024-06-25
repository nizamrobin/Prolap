import Tab from "./Tab";

export default function Tabs() {
  return (
    <ul className="bg-slate-100 flex justify-around p-2 absolute top-0  w-full">
      <Tab value="friends" />
      <Tab value="settings" />
    </ul>
  );
}
