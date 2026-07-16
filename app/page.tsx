export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Catharine Li
      </h1>
      <p className="mb-4">
        {`I was born in Hong Kong 🇭🇰, and I study at UWCT, graduating in 2027.
        I speak English, Chinese, and French.`}
      </p>
      <p className="mb-4">
        {`I'm a high school student currently studying biology and chemistry,
        though I'm also passionate about art. I've taken part in programs
        like the Gibbons Foundation, and since I mainly live in Thailand, I
        enjoy water sports such as kayaking and dragon boating.`}
      </p>
      <h2 className="font-semibold text-xl mb-4 mt-8 tracking-tighter">
        What I'm Proud Of 🏆
      </h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Finished a half-marathon in Phuket, Thailand</li>
        <li>
          Placed third in the National Teenager Dragon Boat Competition held
          in Nanjing
        </li>
        <li>Expert in kayaking and sailing</li>
        <li>Exhibited two art pieces in the whole-school exhibition</li>
        <li>Team leader of the Rescuing Gibbons Foundation</li>
      </ul>
    </section>
  )
}
