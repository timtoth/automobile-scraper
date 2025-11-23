import { describe, expect, it } from "vitest";
import { healthStatus } from "../utils/default-statuses.js";
import { Response } from "express";

describe("health check status code", () => {
  it("should return 200 OK", () => {
    expect(healthStatus()).toBe(200);
  });
});