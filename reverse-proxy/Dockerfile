FROM httpd:2.4

RUN apt-get update && apt-get install -y vim && \
    sed -i '/#LoadModule proxy_module/s/^#//' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/#LoadModule proxy_http_module/s/^#//' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/#LoadModule rewrite_module/s/^#//' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/#LoadModule headers_module/s/^#//' /usr/local/apache2/conf/httpd.conf && \
    echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

COPY builder-proxy.conf /usr/local/apache2/conf/extra/builder-proxy.conf

RUN echo "Include conf/extra/builder-proxy.conf" >> /usr/local/apache2/conf/httpd.conf
