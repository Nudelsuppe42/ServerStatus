import * as React from "react";

import { Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Head from "next/head";
import { Header } from "./Header";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";

interface PageProps {
  children: React.ReactNode;
  title: string;
}

export function Page({ children, title }: PageProps) {
  const [initialData, setInitialData] = useState({});
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#e02628",
      },
      background: {
        default: "#eaecef",
        paper: "#f7f7f7",
      },
      text: {
        primary: "#000000",
        secondary: "rgba(0,0,0,0.42)",
      },
      error: {
        main: "#f4365c",
      },
      warning: {
        main: "#ffc300",
      },
      info: {
        main: "#15adda",
      },
      success: {
        main: "#2ac955",
      },
    },
  });
  useEffect(() => {
    if (initialData) {
      axios.get("http://localhost:8080/api/", {}).then((res) => {
        setInitialData(res.data);
      });
    }
  });

  return (
    <div style={{ minHeight: "90vh" }}>
      <ThemeProvider theme={theme}>
        <Header data={initialData} title={title} />
        <Box sx={{ mx: 30, mt: 10 }}>{children}</Box>
        {JSON.stringify(initialData)}
      </ThemeProvider>
    </div>
  );
}
