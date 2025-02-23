# Note: You can use any Debian/Ubuntu based image you want. 
FROM mcr.microsoft.com/playwright:next

# Enable new "BUILDKIT" mode for Docker CLI
ENV DOCKER_BUILDKIT=1

###############################
#######  CUSTOM SCRIPT
###############################

# Install zsh
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -p git \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -a 'CASE_SENSITIVE="true"'

# Make zsh default
RUN chsh -s $(which zsh)

# Install postgress
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get -y install --no-install-recommends \
    postgresql-client-common \
    postgresql-client-12 

# Node install
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash \
    && . ~/.nvm/nvm.sh \
    && . ~/.profile \ 
    && . ~/.bashrc \
    && nvm install 20.18.1 \
    && . ~/.nvm/nvm.sh \
    && . ~/.profile \ 
    && . ~/.bashrc 

# DOCTL cli lib
RUN wget https://github.com/digitalocean/doctl/releases/download/v1.121.0/doctl-1.121.0-linux-amd64.tar.gz \
    && tar xf doctl-1.121.0-linux-amd64.tar.gz \
    && mv doctl /usr/local/bin \
    && rm doctl-1.121.0-linux-amd64.tar.gz \
    ## 🎯 Automatically update with token
    # && doctl auth init --access-token ""

# Github CLI
RUN type -p curl >/dev/null || (apt update && apt install curl -y)
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt update \
    && apt install gh -y

# Add node to zsh
RUN echo '\
export NVM_DIR="$HOME/.nvm"\n\
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"\n\
' >> ~/.zshrc
