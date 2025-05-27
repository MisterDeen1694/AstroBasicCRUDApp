import type {
	OpenLibraryDocsItem,
	OpenLibraryResponse,
} from "@/types/OpenLibrary";
import type { APIRoute } from "astro";
import { ResponseSentError } from "node_modules/astro/dist/core/errors/errors-data";

export const GET: APIRoute = async ({ request }) => {
	//get query params

	//return early if no params

	//query api endpoint
	try {
		const res = await fetch(
			"https://openlibrary.org/search.json?q=the+lord+of+the+rings&limit=6"
		);
		if (!res.ok) {
			throw new Error("Failed to fetch books");
		}

		//get back books data
		const data = await res.json();

		//query the respone for the data we want
		const books = data.docs.map((book: OpenLibraryDocsItem) => ({
			title: book.title,
			author: book.author_name,
			cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
			id: book.key.replaceAll("/works/", ""),
		}));

		//return
		return new Response(JSON.stringify({ data: [books], error: null }));
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({
				data: null,
				error: error instanceof Error ? error.message : error,
			})
		);
	}
	return new Response(JSON.stringify({ success: true }));
};
