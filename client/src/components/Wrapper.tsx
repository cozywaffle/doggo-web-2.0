type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Wrapper = ({ children }: Props) => {
  return (
    <main className="flex flex-col justify-center items-center box-border h-[90vh]">
      {children}
    </main>
  );
};

export default Wrapper;
