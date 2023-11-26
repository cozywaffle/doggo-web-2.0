import { FC } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Wrapper: FC<Props> = ({ children }) => {
  return (
    <main className="flex flex-col justify-center items-center box-border h-[90vh]">
      {children}
    </main>
  );
};

export default Wrapper;
