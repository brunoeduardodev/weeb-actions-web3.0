import React, { useCallback, useContext, useRef } from "react";
import Loader from "./Loader";
import { TransactionContext } from "../../contexts/TransactionContext";
import { validActions } from "../../utils/constants";
import Input from "./Input";

const Form: React.FC = () => {
  const { sendTransaction, loading } = useContext(TransactionContext);

  const toInput = useRef<HTMLInputElement>(null);
  const amountInput = useRef<HTMLInputElement>(null);
  const actionInput = useRef<HTMLSelectElement>(null);

  const handleSendContract = useCallback(
    (e: any) => {
      e.preventDefault();

      const [address, amount, action] = [
        toInput.current?.value,
        amountInput.current?.value,
        actionInput.current?.value,
      ];

      if (!address || !amount || !action) return;

      sendTransaction({ address, amount, action });
    },
    [sendTransaction]
  );

  return (
    <form
      onSubmit={handleSendContract}
      className="md:p-6 mt-8 mx-auto rounded-xl w-full md:w-10/12 flex flex-col justify-start items-center"
    >
      <Input ref={toInput} type="text" placeholder="Send To" />
      <Input
        ref={amountInput}
        type="number"
        step={0.0001}
        placeholder="Amount"
      />
      <select
        name="action"
        id="action"
        ref={actionInput}
        className="my-2 w-full rounded-md p-2 outline-none bg-transparent text-white border-white/25 text-sm placeholder:text-white/50"
      >
        <option defaultChecked className="text-gray-400" value="">
          Select an action
        </option>
        {[
          validActions.map((action) => (
            <option className="text-black" key={action} value={action}>
              {action}
            </option>
          )),
        ]}
      </select>

      {loading ? (
        <Loader />
      ) : (
        <button
          className="mt-4 w-8/12 bg-stone-700 p-3 text-white rounded-lg"
          type="button"
          onClick={handleSendContract}
        >
          Send
        </button>
      )}
    </form>
  );
};

export default Form;
