import Tab from "./Tab";

export default function Tabs() {
  return (
    <ul className="bg-slate-100 flex justify-around p-2 absolute top-0  w-full">
      <Tab value="friends" icon="assets/chats-fill-svgrepo-com.svg" />
      <Tab value="settings" icon="assets/setting-2-svgrepo-com.svg" />
    </ul>
  );
}
