import axios from "axios";

import config from "../config.json";

export const htmlToPdf = async (content) => {
  try {
    const result = await axios.post(config.SERVER_URL + "/html-to-pdf", {
      content,
    });
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};

export const saveToS3 = async (fileName, arrayBuffer) => {
  try {
    const result = await axios.post(config.SERVER_URL + "/upload-pdf", {
      fileName,
      arrayBuffer,
    });
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};

export const getPdf = async (Key) => {
  try {
    const result = await axios.post(config.SERVER_URL + "/get-pdf", {
      Key,
    });
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};

export const updatePdf = async (id, emp_id, fileName, content) => {
  try {
    const result = await axios.post(config.SERVER_URL + "/update-pdf", {
      id,
      emp_id,
      fileName,
      content,
    });
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};

export const updateNEPdf = async (id, emp_id, fileName, s3Data, approval) => {
  try {
    const result = await axios.post(config.SERVER_URL + "/update-ne-pdf", {
      id,
      emp_id,
      fileName,
      s3Data,
      approval,
    });
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};

export const updateNEPdfApproval = async (id, approval) => {
  try {
    const result = await axios.post(
      config.SERVER_URL + "/update-ne-pdf-approval",
      {
        id,
        approval,
      }
    );
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};

export const scanSavedPdfs = async () => {
  try {
    const result = await axios.get(config.SERVER_URL + "/all-pdfs");
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};

export const scanNEPdfs = async () => {
  try {
    const result = await axios.get(config.SERVER_URL + "/all-ne-pdfs");
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};
