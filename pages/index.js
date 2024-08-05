import Head from "next/head";
import styles from "../styles/Home.module.css";
import fetch from "isomorphic-unfetch";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Hack Clubber</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img src={props.user.avatar} className={styles.avatar} alt="User Avatar" />
        <h1 className={styles.title}>
          Meet <span className={styles.accent}>@{props.user.username}</span>
        </h1>
        <div className={styles.grid}>
          <a
            href={"https://hackclub.slack.com/team/" + props.user.slack}
            className={styles.card}
          >
            <h3>Message them on Slack &rarr;</h3>
            <p>They're on the Hack Club Slack, just like you (I hope)!</p>
          </a>

          <a
            href={"https://scrapbook.hackclub.com/" + props.user.username}
            className={styles.card}
          >
            <h3>Visit their Scrapbook &rarr;</h3>
            <p>Where Hack Clubbers share what they get up to!</p>
          </a>

          {props.user.github && (
            <a
              href={props.user.github}
              className={styles.card}
            >
              <h3>Visit their GitHub &rarr;</h3>
              <p>I'm sure it's full of coding projects and a lot of green.</p>
            </a>
          )}

          {props.user.website && (
            <a
              href={props.user.website}
              className={styles.card}
            >
              <h3>Visit their website &rarr;</h3>
              <p>Their little corner of the internet, who knows what you'll find here!</p>
            </a>
          )}
        </div>
        {props.post && (
          <div className={styles.post}>
            <h2>Recent Post:</h2>
            <p>{props.post.text}</p>
            {props.post.attachments && props.post.attachments.map((attachment, index) => (
              <img key={index} src={attachment.url} alt={`Attachment ${index}`} />
            ))}
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        Meet a random Hack Clubber, built by @YeGao!
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  let users = await fetch("https://scrapbook.hackclub.com/api/users/").then((r) => r.json());

  users = users.filter(u => u.updatesCount !== 0);
  let user = users[Math.floor(Math.random() * users.length)];

  let posts = await fetch(`https://scrapbook.hackclub.com/api/users/${user.username}`).then((r) => r.json());

  let post = posts.length > 0 ? posts[0] : null;

  return {
    props: { user, post },
  };
}
