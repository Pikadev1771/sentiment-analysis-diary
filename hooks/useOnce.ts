export default function useOnce(func: any) {
  // func : 한 번만 실행할 함수
  let isRan = false;
  let result: any;

  function once(this: any) {
    console.log('isRan >>>', isRan);
    // 인자(func)를 한 번만 실행하는 함수
    if (isRan) return result; // 이미 실행 됐으면 => undefined 리턴
    result = func.apply(this, arguments); // func의 실행값
    isRan = true; // 실행됐음 상태로
    return result; // func의 실행값 리턴
  }

  return once;
}
