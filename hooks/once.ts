export default function once(func: any) {
  let isRan = false;

  async function run() {
    if (isRan) return;
    isRan = true;
    await func();

    return run;
  }
}
