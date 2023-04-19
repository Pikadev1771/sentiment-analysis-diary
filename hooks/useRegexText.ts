import { useState, useEffect } from 'react';

interface RegexTextProps {
  state: string;
  regex?: RegExp;
  text: { default: string; match: string; unMatch: string };
}

const useRegexText = ({
  state, // 검증할 입력값
  regex, // 정규식
  text, // 각 경우 반환할 안내문
}: RegexTextProps): string => {
  const [regexText, setRegexText] = useState(text.default); // 반환할 안내문

  useEffect(() => {
    if (regex instanceof RegExp && state !== '') {
      if (!regex.test(state)) {
        // 유효성 테스트 통과 X
        setRegexText(text.unMatch);
      } else if (regex.test(state)) {
        // 유효성 테스트 통과 O
        setRegexText(text.match);
      }
    }
  }, [state, regex, text]);

  return regexText;
};

export default useRegexText;
