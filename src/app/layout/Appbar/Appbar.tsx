import React, { FC } from "react";
import { Link } from "react-router-dom";

import { AppbarContainer, AppbarDefault, LogoContainer } from "./Appbar.style";
import { ReactComponent as Logo } from "../../../img/logo.svg";

const Appbar: FC = () => {
    return (
        <AppbarContainer role="navigation">
            <AppbarDefault>
                <LogoContainer>
                    <Link to="/">
                        <Logo title="MutualAidLogo" role="img" />
                    </Link>
                </LogoContainer>
            </AppbarDefault>
        </AppbarContainer>
    );
}

export default Appbar;
