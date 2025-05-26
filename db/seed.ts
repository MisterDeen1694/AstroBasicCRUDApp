import { Book, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db
		.insert(Book)
		.values([
			{
				id: "1",
				title: "whatever",
				author: ["joe"],
				cover: "https://i.ytimg.com/an_webp/vTht0OygLWA/mqdefault_6s.webp?du=3000&sqp=CIDI08EG&rs=AOn4CLBuOvZEppjDKjPnGfMqxJKa-nbt2g",
				status: "reading",
			},
		]);
}
