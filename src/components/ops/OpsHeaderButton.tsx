interface props {
    onTabSelection: (tab: string) => void;
}

export const OpsHeaderButton = (buttonName: string, {onTabSelection}: props) => {
    return (
        <div id={buttonName.toLowerCase()} onClick={() => onTabSelection(buttonName)}>
            <h3>{buttonName}</h3>
        </div>
    );
}