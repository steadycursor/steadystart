-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_workspaceId_fkey";
ALTER TABLE ONLY public."Membership" DROP CONSTRAINT "Membership_workspaceId_fkey";
ALTER TABLE ONLY public."Membership" DROP CONSTRAINT "Membership_userId_fkey";
DROP INDEX public."User_email_key";
DROP INDEX public."User_clerkId_key";
DROP INDEX public."User_clerkId_idx";
DROP INDEX public."User_clerkId_email_key";
DROP INDEX public."Config_key_key";
ALTER TABLE ONLY public."Workspace" DROP CONSTRAINT "Workspace_pkey";
ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_pkey";
ALTER TABLE ONLY public."Membership" DROP CONSTRAINT "Membership_pkey";
DROP TABLE public."Workspace";
DROP TABLE public."User";
DROP TABLE public."Post";
DROP TABLE public."Membership";
DROP TABLE public."Config";
DROP TYPE public."Locale";
--
-- Name: Locale; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Locale" AS ENUM (
    'EN',
    'CS'
);


ALTER TYPE public."Locale" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Config" (
    key text NOT NULL,
    value jsonb NOT NULL
);


ALTER TABLE public."Config" OWNER TO postgres;

--
-- Name: Membership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Membership" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "workspaceId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Membership" OWNER TO postgres;

--
-- Name: Post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Post" (
    id text NOT NULL,
    title text NOT NULL,
    "workspaceId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Post" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "clerkId" text NOT NULL,
    email text NOT NULL,
    locale public."Locale" DEFAULT 'EN'::public."Locale" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: Workspace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Workspace" (
    id text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Workspace" OWNER TO postgres;

--
-- Data for Name: Config; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Config" (key, value) FROM stdin;
\.


--
-- Data for Name: Membership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Membership" (id, "userId", "workspaceId", "createdAt", "updatedAt") FROM stdin;
23acd84321ea491c8e27	8efb256531f14abf84bd	56bff15d207f41f9b20d	2000-02-15 15:30:00	2000-02-15 15:30:00
8bde175693b74a4ca012	8efb256531f14abf84bd	c4ff8234d86d4f2b9321	2000-02-15 15:30:00	2000-02-15 15:30:00
f5e7d92a45c64b87b103	f73f921ab74948019d1a	56bff15d207f41f9b20d	2000-02-15 15:30:00	2000-02-15 15:30:00
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Post" (id, title, "workspaceId", "createdAt", "updatedAt") FROM stdin;
31eff82d609d4a7f95e4	First Post	56bff15d207f41f9b20d	2000-02-15 16:30:00	2000-02-15 16:30:00
7ab34c9d871e42f0a265	Second Post	56bff15d207f41f9b20d	2000-02-15 16:30:00	2000-02-15 16:30:00
e2f1d78a362c4d9ba016	Third Post	c4ff8234d86d4f2b9321	2000-02-15 16:30:00	2000-02-15 16:30:00
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "clerkId", email, locale, "createdAt", "updatedAt") FROM stdin;
8efb256531f14abf84bd	user_2KFGyu7zFgdcTPnC1IrHQQ93I1F	admin@example.com	EN	2000-02-15 13:30:00	2000-02-15 13:30:00
f73f921ab74948019d1a	user_2N2LqsqRLkleZruGZHXf2Rx02io	user@example.com	CS	2000-02-15 13:30:00	2000-02-15 13:30:00
\.


--
-- Data for Name: Workspace; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Workspace" (id, title, "createdAt", "updatedAt") FROM stdin;
56bff15d207f41f9b20d	Test Workspace 1	2000-02-15 14:30:00	2000-02-15 14:30:00
c4ff8234d86d4f2b9321	Test Workspace 2	2000-02-15 14:30:00	2000-02-15 14:30:00
\.


--
-- Name: Membership Membership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Membership"
    ADD CONSTRAINT "Membership_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Workspace Workspace_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Workspace"
    ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY (id);


--
-- Name: Config_key_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Config_key_key" ON public."Config" USING btree (key);


--
-- Name: User_clerkId_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_clerkId_email_key" ON public."User" USING btree ("clerkId", email);


--
-- Name: User_clerkId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_clerkId_idx" ON public."User" USING btree ("clerkId");


--
-- Name: User_clerkId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_clerkId_key" ON public."User" USING btree ("clerkId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Membership Membership_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Membership"
    ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Membership Membership_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Membership"
    ADD CONSTRAINT "Membership_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

