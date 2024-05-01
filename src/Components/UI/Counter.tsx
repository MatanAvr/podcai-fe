import { useEffect, useRef, useState } from "react";

type CounterProps = {
  seconds: number;
};

const Counter = ({ seconds }: CounterProps) => {
  const [counter, setCounter] = useState<number>(seconds);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      window.location.reload();
    }
  }, [counter]);
  return <span>{counter}</span>;
};

export default Counter;
