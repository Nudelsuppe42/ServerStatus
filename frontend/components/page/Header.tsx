import * as React from "react";

import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Head from "next/head";
import { Status } from "../Status";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";

interface HeaderProps {
  title: string;
  data: any;
}

export function Header({ data, title }: HeaderProps) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title> Server Status - {title}</title>
        <meta name="description" content={"Status of the servers"} />
      </Head>
      <AppBar
      position="fixed"
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #e5e7e7",
          boxShadow: "none",
          height: "height: 62.5px !important;",
          color:"black"
        }}
      >
        <Toolbar
          sx={{
            minHeight: "30.5px !important",
            padding: "8px",
            backgroundColor: "#fff",
            width: "100vw",
            maxWidth: "1280px",
            mr: "auto",
            ml: "auto",
          }}
        >
          <img src="/logo.png" alt="logo" height="32" />
          <Status status={data.status} color="green" sx={{ml:2}} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
