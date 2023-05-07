export default function once(func: any) {
  let isRan = false;

  function run() {
    console.log('isRan >>>', isRan);
    if (isRan) return;
    isRan = true;
    func();
  }

  return run;
}
