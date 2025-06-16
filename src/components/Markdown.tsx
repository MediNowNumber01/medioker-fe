import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const renderers: Components = {
    h1: ({ children }) => <div className="text-xl font-bold">{children}</div>,
    h2: ({ children }) => <div className="text-lg font-bold">{children}</div>,
    h3: ({ children }) => <div className="text-md font-bold">{children}</div>,
    h4: ({ children }) => <div className="text-sm font-bold">{children}</div>,
    p: ({ children }) => <div className="text-sm">{children}</div>,
    ol: ({ children }) => <div className="text-md font-bold">{children}</div>,
    li: ({ children }) => <div className="text-md font-light">{children}</div>,
    u: ({ children }) => <div className="underline">{children}</div>,
    strong: ({ children }) => (
      <strong className="font-medium">{children}</strong>
    ),
  };
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
