import React, { FC } from "react";

import { PageContainer } from "./Page.style";
import PageProps from "./Page.props";
import Appbar from "../Appbar";

const Page: FC<PageProps> = ({ children }: PageProps) => {
    return (
        <>
            <Appbar />
            <PageContainer role="main">
                {children}
            </PageContainer>
        </>
    );
}

export default Page;
