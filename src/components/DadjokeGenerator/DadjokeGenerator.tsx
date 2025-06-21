import React from "react";
import { WindowChild } from "../Window/WindowChild";

const DadjokeGenerator = () => {
  const [joke, setJoke] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  async function fetchDadJoke() {
    setLoading(true);
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      console.error("Failed to fetch dad joke:", error);
      setJoke("Oops! Something went wrong while fetching a dad joke.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <WindowChild height={200} width={600}>
      <Alert message={joke} title="Dad Joke Generator" type="info">

        <Alert.Button variant="primary" onClick={fetchDadJoke} >
          {loading ? "Loading..." : "Get a Dad Joke"}
        </Alert.Button>


        <Alert.Button
          variant="secondary"
          onClick={() => {
            alert("Closing the dad joke generator.");
          }}
        >
          Close
        </Alert.Button>
      </Alert>
    </WindowChild>
  );
};

interface AlertProps {
  type: "error" | "warning" | "success" | "info";
  title: string;
  message: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

interface AlertButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

// Create a context for sharing alert config
const AlertContext = React.createContext<{
  buttonColor: string;
} | null>(null);

const Alert = ({ type, title, message, icon, children }: AlertProps) => {
  const getAlertConfig = () => {
    switch (type) {
      case "error":
        return {
          bgColor: "bg-red-100",
          iconColor: "text-red-600",
          buttonColor: "bg-red-600 hover:bg-red-500",
        };
      case "warning":
        return {
          bgColor: "bg-yellow-100",
          iconColor: "text-yellow-600",
          buttonColor: "bg-yellow-600 hover:bg-yellow-500",
        };
      case "success":
        return {
          bgColor: "bg-green-100",
          iconColor: "text-green-600",
          buttonColor: "bg-green-600 hover:bg-green-500",
        };
      case "info":
        return {
          bgColor: "bg-blue-100",
          iconColor: "text-blue-600",
          buttonColor: "bg-blue-600 hover:bg-blue-500",
        };
    }
  };
  const config = getAlertConfig();
  const renderIcon = () => {
    if (icon) {
      return icon;
    }
    return null;
  };
  return (
    <AlertContext.Provider value={{ buttonColor: config.buttonColor }}>
      <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all h-full w-full grid grid-rows-[70%_30%]">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div
              className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${config.bgColor} sm:mx-0 sm:size-10`}
            >
              {renderIcon()}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-base font-semibold text-gray-900">{title}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>{" "}
            </div>
          </div>
        </div>{" "}
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          {children}
        </div>
      </div>
    </AlertContext.Provider>
  );
};

const AlertButton = ({ variant, children, className, ...buttonProps }: AlertButtonProps) => {
  const context = React.useContext(AlertContext);
  const baseClasses =
    "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs sm:w-auto";

  const variantClasses = {
    primary: `${
      context?.buttonColor || "bg-blue-600 hover:bg-blue-500"
    } text-white sm:ml-3`,
    secondary:
      "mt-3 bg-white text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0",
  };

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className || ""}`.trim();

  return (
    <button
      type="button"
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

Alert.Button = AlertButton;

export default DadjokeGenerator;


