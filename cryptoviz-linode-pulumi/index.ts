import * as linode from "@pulumi/linode";

// Create a Linode resource (Linode Instance)
const instance = new linode.Instance("cryptoviz-us-instance-new", {
    authorizedUsers: ["adityak74"],
    type: "g6-standard-1",
    privateIp: true,
    region: "us-southeast",
    image: "linode/ubuntu18.04",
    label: "cryptoviz-us-southeast",
    rootPass: "testpass!",
});

// Export the Instance label of the instance
export const instanceLabel = instance;
