const SignUpInput = () => {
  return (
    <div className="labelInputContainer">
      <label id="email"></label>
      <input
        className="email"
        name="email"
        placeholder="email을 입력해주세요"
      ></input>
    </div>
  );
};

export default SignUpInput;
