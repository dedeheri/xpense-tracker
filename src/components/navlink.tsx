import Link from "next/link";

const Navlink = () => {
  return (
    <section className="flex space-x-3">
      <Link href={"/"}>
        <p>Tracking</p>
      </Link>

      <Link href={"/"}>
        <p>Target</p>
      </Link>
    </section>
  );
};

export default Navlink;
