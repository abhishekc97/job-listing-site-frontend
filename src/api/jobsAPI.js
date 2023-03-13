import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

// api to make a new job post
export async function createJobPost(body) {
    try {
        const reqUrl = `${URL}/api/jobs/new`;
        const result = await axios.post(reqUrl, body);
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

// api to get a job by id
export async function getJobPost(id) {
    try {
        const reqUrl = `${URL}/api/jobs/job/${id}`;
        const result = await axios.get(reqUrl);
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}
// api to get all jobs
export async function getAllJobPosts() {
    try {
        const reqUrl = `${URL}/api/jobs/all`;
        const result = await axios.get(reqUrl);
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}
// api to update a job post
export async function editJobPost(id, body) {
    try {
        const reqUrl = `${URL}/api/jobs/edit/${id}`;
        const result = await axios.put(reqUrl, body);
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}
