import styled from 'styled-components';
import tw from 'tailwind.macro';

export const StyledForm = styled.div.attrs({
  className: 'flex flex-col justify-center items-center',
})`
  & {
    form {
      ${tw`bg-white text-center rounded py-8 px-5 shadow max-w-xs`}
    }
    input {
      ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
    }
    button {
      ${tw`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
    }
  }
`;

export const Button = styled.button`
  ${tw`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
`;
export const Header = styled.header`
  ${tw`bg-blue-700 h-16 flex flex-col items-center justify-center text-xl text-white`};
`;
export const Footer = styled.footer`
  ${tw`bg-blue-200 h-10 flex flex-col items-center justify-center text-xl text-white`};
`;
export const Main = styled.footer`
  ${tw`w-screen h-screen bg-gray-200`};
`;
export const AppStyles = styled.main.attrs({
  className: 'w-screen h-screen bg-green-100 p-2',
})`
  & {
    h1 {
      ${tw`font-sans text-2xl font-hairline text-6xl text-teal-500`}
    }
    p {
      ${tw`text-gray-700 text-lg`}
    }
    h2 {
      ${tw`text-2xl font-hairline mt-5 text-teal-500`}
    }
    ul {
      ${tw`inline-flex`}
    }
    li {
      ${tw`mr-5`}
    }
    a {
      ${tw`text-blue-500 hover:text-gray-500 hover:underline`}
    }
  }
`;
