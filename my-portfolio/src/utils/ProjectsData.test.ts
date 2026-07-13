import { describe, expect, test, vi, beforeEach } from "vitest";

const getDocsMock = vi.fn();
const collectionMock = vi.fn();
const docMock = vi.fn();
const getDocMock = vi.fn();
const queryMock = vi.fn();
const whereMock = vi.fn();

vi.mock("firebase/firestore", () => ({
  collection: collectionMock,
  doc: docMock,
  getDoc: getDocMock,
  getDocs: getDocsMock,
  query: queryMock,
  where: whereMock,
}));

vi.mock("./../firebase", () => ({
  db: {},
}));

describe("ProjectsData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns an empty list when Firestore denies access", async () => {
    getDocsMock.mockRejectedValueOnce(
      new Error("Missing or insufficient permissions"),
    );
    queryMock.mockReturnValue({});
    whereMock.mockReturnValue({});

    const { getProjectsToFrontend } = await import("./ProjectsData");

    await expect(getProjectsToFrontend()).resolves.toEqual([]);
  });
});
