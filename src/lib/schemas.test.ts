import { describe, expect, it } from "vitest";
import { z } from "zod";
import { registrationSteps } from "./registration-steps";
import { RegistrationSchema, registrationFields, registrationSchema } from "./schemas";

const valid: RegistrationSchema = {
  firstName: "Amina",
  lastName: "Belkacem",
  email: "amina@example.com",
  phone: "0555123456",
  birthDate: "15/05/2000",
  discord: "amina",
  enrollmentYear: "2021",
  institution: "USTHB",
  matricule: "202112345678",
  major: "Computer Science",
  teamName: "Root",
  availability: "yes",
  prevExperience: "no",
  prevExperienceDetails: "",
  motivation: "Learning",
  skills: "TypeScript",
  github: "",
  linkedin: "",
  portfolio: "",
  behance: "",
};

// The first error message for each invalid field, as the form shows them
const errorsFor = (overrides: Partial<RegistrationSchema>, schema: z.ZodType = registrationSchema) => {
  const result = schema.safeParse({ ...valid, ...overrides });
  const errors: Record<string, string> = {};

  for (const issue of result.error?.issues ?? [])
    errors[String(issue.path[0])] ??= issue.message;

  return errors;
};

describe("registrationSchema", () => {
  it("accepts a complete registration", () => {
    expect(errorsFor({})).toEqual({});
  });

  describe("phone", () => {
    it("requires 10 digits", () => {
      expect(errorsFor({ phone: "" })).toEqual({ phone: "Phone number is required" });
      expect(errorsFor({ phone: "055512345" })).toEqual({ phone: "Phone number must be 10 digits" });
      expect(errorsFor({ phone: "abcdefghij" })).toEqual({ phone: "Phone number must be 10 digits" });
    });
  });

  describe("birthDate", () => {
    it("requires a real date in the past", () => {
      expect(errorsFor({ birthDate: "" })).toEqual({ birthDate: "Birth date is required" });
      expect(errorsFor({ birthDate: "garbage" })).toEqual({ birthDate: "Must be a valid date" });
      expect(errorsFor({ birthDate: "31/02/2000" })).toEqual({ birthDate: "Must be a valid date" });
      expect(errorsFor({ birthDate: "01/01/2999" })).toEqual({ birthDate: "Must be in the past" });
    });
  });

  describe("enrollmentYear", () => {
    // An empty year used to pass, because Number("") is 0
    it("is required", () => {
      expect(errorsFor({ enrollmentYear: "" })).toEqual({ enrollmentYear: "Enrollment year is required" });
    });

    it("must be a four-digit year that isn't in the future", () => {
      expect(errorsFor({ enrollmentYear: "abc" })).toEqual({ enrollmentYear: "Must be a valid year" });
      expect(errorsFor({ enrollmentYear: "21" })).toEqual({ enrollmentYear: "Must be a valid year" });
      expect(errorsFor({ enrollmentYear: "2999" })).toEqual({ enrollmentYear: "Can't be in the future" });
      expect(errorsFor({ enrollmentYear: String(new Date().getFullYear()) })).toEqual({});
    });
  });

  describe("prevExperienceDetails", () => {
    it("is required when the answer is yes", () => {
      const error = { prevExperienceDetails: "Tell us which hackathons you took part in" };

      expect(errorsFor({ prevExperience: "yes", prevExperienceDetails: "" })).toEqual(error);
      expect(errorsFor({ prevExperience: "yes", prevExperienceDetails: "   " })).toEqual(error);
      expect(errorsFor({ prevExperience: "yes", prevExperienceDetails: "Hack 2024" })).toEqual({});
    });

    it("is optional when the answer is no", () => {
      expect(errorsFor({ prevExperience: "no", prevExperienceDetails: "" })).toEqual({});
    });

    it("is reported alongside errors in other fields", () => {
      expect(errorsFor({ teamName: "", prevExperience: "yes" })).toEqual({
        teamName: "Team name is required",
        prevExperienceDetails: "Tell us which hackathons you took part in",
      });
    });
  });

  describe("profile links", () => {
    it("are optional", () => {
      expect(errorsFor({ github: "", linkedin: "", portfolio: "", behance: "" })).toEqual({});
    });

    it("accept links with or without https://", () => {
      expect(errorsFor({
        github: "github.com/amina",
        linkedin: "https://www.linkedin.com/in/amina",
        portfolio: "amina.dev",
        behance: "http://behance.net/amina",
      })).toEqual({});
    });

    it("must point to their own site", () => {
      expect(errorsFor({
        github: "linkedin.com/in/amina",
        linkedin: "amina",
        behance: "https://evilbehance.net/amina",
      })).toEqual({
        github: "Must be a GitHub link",
        linkedin: "Must be a LinkedIn link",
        behance: "Must be a Behance link",
      });
    });

    it("accept subdomains of their site", () => {
      expect(errorsFor({ github: "https://gist.github.com/amina" })).toEqual({});
    });

    it("reject a portfolio that isn't a web link", () => {
      expect(errorsFor({ portfolio: "not a link" })).toEqual({ portfolio: "Must be a valid link" });
      expect(errorsFor({ portfolio: "ftp://amina.dev" })).toEqual({ portfolio: "Must be a valid link" });
    });
  });
});

describe("registrationSteps", () => {
  const steps = Object.values(registrationSteps);

  it("ask for every field exactly once", () => {
    const stepFields = steps.flatMap((step) => Object.keys(step.schema.shape)).sort();
    expect(stepFields).toEqual(Object.keys(registrationFields.shape).sort());
  });

  it("each accept their slice of a complete registration", () => {
    for (const step of steps)
      expect(errorsFor({}, step.schema), step.path).toEqual({});
  });

  it("check the experience details on the hackathon step", () => {
    expect(errorsFor({ prevExperience: "yes" }, registrationSteps.hackathon.schema)).toEqual({
      prevExperienceDetails: "Tell us which hackathons you took part in",
    });
  });
});
