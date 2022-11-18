import { MDXRemoteSerializeResult } from "next-mdx-remote";



export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>;

export const validateCreditCardDate = (value: string) => {
    if (value.length !== 5) {
        return `Wprowadz dane w formacie MM/YY`;
      }
      const [month, year] = value.split("/");
      if (Number(month) > 12) {
        return `Niepoprawny miesiac`;
      }
      return true;
}
