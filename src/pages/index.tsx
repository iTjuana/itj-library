import { type NextPage } from "next";
import { api } from "utils/trpc";

const Home: NextPage = () => {

  const hello = api.inventory.hello.useQuery({ text: "client" });
  const getUser = api.users.findUserById.useQuery({ id: '1' })
  const getUsers = api.users.getUsers.useQuery();
  const mutation = api.users.addUser.useMutation();

  const handleAddUser = () => {
    const user = {
      name: 'Kanye West',
      email: 'kanye.west@dexcom.com',
      image: 'goat.png',
    };
    mutation.mutate(user);
  };

  if (!hello.data || !getUser.data || !getUsers.data) {
    console.log("waiting");
  } else {
    console.log(`got: ${hello.data.greeting}`);
    console.log(`There are ${getUsers.data?.length} users, ${getUsers.data?.map(obj => obj.name)}`);
    console.log(`got: ${getUser.data?.name} | ${getUser.data?.email}`);
  }


  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">Books</h1>


        {/* Test button */}
        <button onClick={handleAddUser} disabled={mutation.isLoading} className="bg-[#1C325F] text-white rounded px-4 py-2">
          Test addUser
        </button>
        {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}


        {/* Carrousel */}
        {/* Instructions */}
        <section className="flex max-w-3xl flex-col items-center gap-4">
          <h2 className="text-2xl font-medium text-[#323232]">Instructions</h2>
          <div className="rounded bg-white p-4 text-lg font-medium text-[#323232]">
            <h3 className="text-xl font-semibold">To Borrow:</h3>
            <ol className="list-decimal pl-8">
              <li>Visit the online library website.</li>
              <li>Log in or create an account.</li>
              <li>
                Once you are logged in, browse the library catalog to find the
                book you want to borrow.
              </li>
              <li>
                Click on the book title to view its details. Look for the
                availability status, which will indicate if the book is
                currently available for borrowing.
              </li>
              <li>
                If the book is available, click on the option to borrow or add
                it to your borrowing list.
              </li>
              <li>
                Once you have selected the book, you will receive a due date for
                returning the book. Take note of this date, as it will determine
                when you need to return the book to the library. The due date is
                usually displayed in your account or can be sent to you via
                email.
              </li>
              <li>
                With the book successfully borrowed, you can start reading and
                enjoying it during the borrowing period.
              </li>
              <li>Return the book on time.</li>
            </ol>
          </div>
          <div className="rounded bg-white p-4 text-lg font-medium text-[#323232]">
            <h3 className="text-xl font-semibold">To Donate:</h3>
            <ol className="list-decimal pl-8">
              <li>Visit the online library website.</li>
              <li>
                In the contact section, search for Melissa Lira&#39;s name or
                look for a specific department or person responsible for
                handling donations.
              </li>
              <li>
                Open your email client or use the contact form provided on the
                website to compose a message.
              </li>
              <li>
                In the message, state that you would like to donate a book to
                the library. Provide a brief description of the book, including
                the title, author, and any other relevant details.
              </li>
              <li>
                Send the message, and patiently wait for a response from Melissa
                Lira or the library staff. They will likely contact you to
                discuss the book donation further, provide any necessary
                instructions, or express their gratitude for your generosity.
              </li>
            </ol>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
