import { isLogged } from "@/signals/isLogged.tsx";
import { asset } from "$fresh/runtime.ts";

function NavBar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand navbar-logo" href="/">
            <img
              src={asset("/images/roomoney_logo.webp")}
              alt="Roomoney App Logo"
              id="navbar-logo"
            />Roomoney 💵
          </a>
          <div>
            <ul class="navbar-nav me-auto">
              {isLogged.value === true
                ? (
                  <>
                    <li class="nav-item">
                      <a class="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/logout">Logout</a>
                    </li>
                  </>
                )
                : (
                  <>
                    <li class="nav-item">
                      <a class="nav-link" href="/login">Log in</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/register">Sign up</a>
                    </li>
                  </>
                )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
