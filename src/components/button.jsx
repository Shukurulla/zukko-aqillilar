export const PrimaryButton = ({ children, onclick }) => {
  return (
    <button
      onclick={() => onclick("/dashboard")}
      className="px-8 py-3 text-xl text-md bg-[#255ED6] text-white rounded-full"
    >
      {children}
    </button>
  );
};
