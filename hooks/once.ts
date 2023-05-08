export default function once(func: any) {
  let isRan = false;
  let result: any;

  async function run() {
    console.log('isRan >>>', isRan);
    if (isRan) return result;
    isRan = true;
    result = await func();
    console.log('result >>>', result);
    return result;
  }

  return run;
}
