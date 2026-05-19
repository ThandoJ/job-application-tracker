import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendStatusEmail =
  async ({
    to,
    name,
    jobTitle,
    company,
    status,
    interviewDate,
    location
  }) => {

    let subject =
      `Application Update - ${jobTitle}`;

    let html = `
      <h2>Hello ${name}</h2>

      <p>
        Your application for
        <strong>${jobTitle}</strong>
        at ${company}
        has been updated to:
      </p>

      <h3>${status.toUpperCase()}</h3>
    `;

    // INTERVIEW EMAIL
    if (status === "interview") {

      html += `
        <p>
          Interview Details:
        </p>

        <ul>
          <li>
            Date:
            ${new Date(
              interviewDate
            ).toLocaleDateString()}
          </li>

          <li>
            Time:
            ${new Date(
              interviewDate
            ).toLocaleTimeString()}
          </li>

          <li>
            Location:
            ${location}
          </li>
        </ul>
      `;
    }

    html += `
      <p>
        Best regards,
        Launchora Recruitment
      </p>
    `;

    await resend.emails.send({
      from:
        "Launchora <onboarding@resend.dev>",
      to,
      subject,
      html
    });
};

