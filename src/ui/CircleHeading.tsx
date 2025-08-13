import React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const CircleHeading = () => {
    return (
        <Box
            sx={{
                display: "grid",
                placeContent: "center",
                bgcolor: "emerald.950", // You may need to define this color in your theme
                px: 4,
                py: 12,
                color: "yellow.50", // You may need to define this color in your theme
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    maxWidth: "32rem",
                    textAlign: "center",
                    fontSize: { xs: "2.5rem", md: "3rem" },
                    lineHeight: 1.375,
                }}
            >
               Grow with Our {" "}
                <Box
                    component="span"
                    sx={{ position: "relative", display: "inline-block" }}
                >
                   Digital Marketing
                    <Box
                        component="svg"
                        viewBox="0 0 286 73"
                        fill="none"
                        sx={{
                            position: "absolute",
                            left: -8,
                            right: -8,
                            top: -8,
                            bottom: 0,
                            transform: "translateY(0.25rem)",
                            width: "100%",
                            height: "auto",
                            pointerEvents: "none",
                        }}
                    >
                        <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{
                                duration: 1.25,
                                ease: "easeInOut",
                            }}
                            d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                            stroke="#FACC15"
                            strokeWidth="3"
                        />
                    </Box>
                </Box>{" "}
                Services 
            </Typography>
        </Box>
    );
};