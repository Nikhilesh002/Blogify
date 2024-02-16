import React,{useId,forwardRef} from 'react';

const Input=forwardRef(
  function Input({label,type='text',className='',...props},ref){
    const id=useId();
    return(
      <div className="w-full">
        { label && <label className='inline-block font-serif text-md mb-1 pl-1' htmlFor={id}>{label}</label> }
        <input type={type} id={id} ref={ref} {...props}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 borderborder-gray-200 w-full ${className}`} />
      </div>
    )
  }
);


export default Input;