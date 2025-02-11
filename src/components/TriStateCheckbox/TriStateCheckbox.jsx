import { useEffect, useRef } from "react";

function TriStateCheckbox({ checked, onChange, ariaLabel }) {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (!checkboxRef.current) {
      return;
    }

    if (checked === "indeterminate") {
      checkboxRef.current.indeterminate = true;
      checkboxRef.current.checked = true;
    } else {
      checkboxRef.current.indeterminate = false;
      checkboxRef.current.checked = checked;
    }
  }, [checked]);

  return (
    <input
      type="checkbox"
      ref={checkboxRef}
      onChange={onChange}
      aria-label={ariaLabel}
    />
  );
}

export default TriStateCheckbox;
