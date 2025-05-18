import { Kysely } from 'kysely';
import type { DB } from '../../src/common/database/types'; // Adjust path as necessary
import { db } from '../../src/common/database/db';

// Helper to convert SQL date strings to JS Date objects or keep as string if not needed by DB
// For now, Kysely handles string dates fine for PostgreSQL date/timestamp fields.
// const parseDate = (dateStr: string | null | undefined) => dateStr ? new Date(dateStr) : undefined;


export async function seed(db: Kysely<DB>): Promise<void> {
    // ===============================================
    // INSERINDO CATEGORIAS
    // ===============================================
    const categorias = [
        { nomeCategoria: 'Eletrônicos', descricao: 'Produtos eletrônicos, tecnologia e informática' },
        { nomeCategoria: 'Alimentos e Bebidas', descricao: 'Produtos alimentícios, bebidas e snacks' },
        { nomeCategoria: 'Vestuário', descricao: 'Roupas, calçados e acessórios' },
        { nomeCategoria: 'Casa e Decoração', descricao: 'Móveis, decoração e utilidades domésticas' },
        { nomeCategoria: 'Esportes e Lazer', descricao: 'Produtos esportivos e equipamentos de lazer' },
        { nomeCategoria: 'Beleza e Cuidados', descricao: 'Cosméticos, perfumaria e cuidados pessoais' },
        { nomeCategoria: 'Livros e Papelaria', descricao: 'Livros, material escolar e escritório' },
        { nomeCategoria: 'Brinquedos', descricao: 'Brinquedos e jogos infantis' },
    ];
    await db.insertInto('categoria').values(categorias).execute();
    console.log('Categorias inseridas.');

    // Fetching category IDs for product mapping (assuming auto-incrementing IDs)
    // This is a simplified approach. In a real scenario, you might query them back or know them.
    // For this script, we'll assume IDs 1 through 8 based on insertion order.

    // ===============================================
    // INSERINDO PRODUTOS
    // ===============================================
    const produtos = [
        // Eletrônicos
        { codigoProduto: 'ELET001', nomeProduto: 'Smartphone Galaxy S22', descricao: 'Smartphone Samsung Galaxy S22 128GB', idCategoria: 1, marca: 'Samsung', precoAtual: 3499.00, unidadeMedida: 'UN' },
        { codigoProduto: 'ELET002', nomeProduto: 'Notebook Dell Inspiron 15', descricao: 'Notebook Dell i5 8GB RAM 512GB SSD', idCategoria: 1, marca: 'Dell', precoAtual: 2899.00, unidadeMedida: 'UN' },
        { codigoProduto: 'ELET003', nomeProduto: 'TV Smart 50" 4K', descricao: 'Smart TV LG 50 polegadas 4K', idCategoria: 1, marca: 'LG', precoAtual: 2199.00, unidadeMedida: 'UN' },
        { codigoProduto: 'ELET004', nomeProduto: 'Fone Bluetooth', descricao: 'Fone de ouvido bluetooth JBL', idCategoria: 1, marca: 'JBL', precoAtual: 249.90, unidadeMedida: 'UN' },
        { codigoProduto: 'ELET005', nomeProduto: 'Mouse Gamer', descricao: 'Mouse gamer RGB Logitech', idCategoria: 1, marca: 'Logitech', precoAtual: 199.90, unidadeMedida: 'UN' },
        // Alimentos e Bebidas
        { codigoProduto: 'ALIM001', nomeProduto: 'Café Premium 500g', descricao: 'Café torrado e moído premium', idCategoria: 2, marca: 'Melitta', precoAtual: 24.90, unidadeMedida: 'PCT' },
        { codigoProduto: 'ALIM002', nomeProduto: 'Chocolate ao Leite 200g', descricao: 'Chocolate ao leite Nestlé', idCategoria: 2, marca: 'Nestlé', precoAtual: 8.90, unidadeMedida: 'UN' },
        { codigoProduto: 'ALIM003', nomeProduto: 'Água Mineral 1,5L', descricao: 'Água mineral sem gás', idCategoria: 2, marca: 'Crystal', precoAtual: 2.90, unidadeMedida: 'UN' },
        { codigoProduto: 'ALIM004', nomeProduto: 'Biscoito Integral', descricao: 'Biscoito integral multigrãos', idCategoria: 2, marca: 'Vitarella', precoAtual: 4.50, unidadeMedida: 'PCT' },
        { codigoProduto: 'ALIM005', nomeProduto: 'Suco Natural 1L', descricao: 'Suco de laranja natural', idCategoria: 2, marca: 'Del Valle', precoAtual: 7.90, unidadeMedida: 'UN' },
        // Vestuário
        { codigoProduto: 'VEST001', nomeProduto: 'Camisa Polo Masculina', descricao: 'Camisa polo algodão masculina', idCategoria: 3, marca: 'Lacoste', precoAtual: 189.90, unidadeMedida: 'UN' },
        { codigoProduto: 'VEST002', nomeProduto: 'Calça Jeans Feminina', descricao: 'Calça jeans feminina skinny', idCategoria: 3, marca: 'Levi\'s', precoAtual: 259.90, unidadeMedida: 'UN' },
        { codigoProduto: 'VEST003', nomeProduto: 'Tênis Running', descricao: 'Tênis para corrida unissex', idCategoria: 3, marca: 'Nike', precoAtual: 399.90, unidadeMedida: 'PAR' },
        { codigoProduto: 'VEST004', nomeProduto: 'Vestido Casual', descricao: 'Vestido casual feminino', idCategoria: 3, marca: 'Renner', precoAtual: 119.90, unidadeMedida: 'UN' },
        { codigoProduto: 'VEST005', nomeProduto: 'Mochila Escolar', descricao: 'Mochila escolar resistente', idCategoria: 3, marca: 'Samsonite', precoAtual: 149.90, unidadeMedida: 'UN' },
        // Casa e Decoração
        { codigoProduto: 'CASA001', nomeProduto: 'Jogo de Panelas 5 peças', descricao: 'Jogo de panelas antiaderente', idCategoria: 4, marca: 'Tramontina', precoAtual: 299.90, unidadeMedida: 'JG' },
        { codigoProduto: 'CASA002', nomeProduto: 'Edredom Casal', descricao: 'Edredom casal 100% algodão', idCategoria: 4, marca: 'Santista', precoAtual: 189.90, unidadeMedida: 'UN' },
        { codigoProduto: 'CASA003', nomeProduto: 'Conjunto de Toalhas', descricao: 'Kit 4 toalhas de banho', idCategoria: 4, marca: 'Karsten', precoAtual: 99.90, unidadeMedida: 'KIT' },
        { codigoProduto: 'CASA004', nomeProduto: 'Luminária de Mesa', descricao: 'Luminária LED para mesa', idCategoria: 4, marca: 'Philips', precoAtual: 89.90, unidadeMedida: 'UN' },
        { codigoProduto: 'CASA005', nomeProduto: 'Organizador Multiuso', descricao: 'Organizador plástico com divisórias', idCategoria: 4, marca: 'Ordene', precoAtual: 39.90, unidadeMedida: 'UN' },
        // Esportes e Lazer
        { codigoProduto: 'ESPO001', nomeProduto: 'Bola de Futebol', descricao: 'Bola de futebol oficial', idCategoria: 5, marca: 'Adidas', precoAtual: 129.90, unidadeMedida: 'UN' },
        { codigoProduto: 'ESPO002', nomeProduto: 'Kit Halteres 10kg', descricao: 'Par de halteres ajustáveis', idCategoria: 5, marca: 'Kikos', precoAtual: 199.90, unidadeMedida: 'KIT' },
        { codigoProduto: 'ESPO003', nomeProduto: 'Tapete Yoga', descricao: 'Tapete para yoga antiderrapante', idCategoria: 5, marca: 'Acte Sports', precoAtual: 79.90, unidadeMedida: 'UN' },
        { codigoProduto: 'ESPO004', nomeProduto: 'Bicicleta Aro 29', descricao: 'Mountain bike aro 29', idCategoria: 5, marca: 'Caloi', precoAtual: 1499.00, unidadeMedida: 'UN' },
        { codigoProduto: 'ESPO005', nomeProduto: 'Corda de Pular', descricao: 'Corda de pular profissional', idCategoria: 5, marca: 'Speedo', precoAtual: 39.90, unidadeMedida: 'UN' },
        // Beleza e Cuidados
        { codigoProduto: 'BELZ001', nomeProduto: 'Shampoo 400ml', descricao: 'Shampoo hidratante', idCategoria: 6, marca: 'Pantene', precoAtual: 18.90, unidadeMedida: 'UN' },
        { codigoProduto: 'BELZ002', nomeProduto: 'Creme Hidratante 200ml', descricao: 'Creme hidratante corporal', idCategoria: 6, marca: 'Nivea', precoAtual: 24.90, unidadeMedida: 'UN' },
        { codigoProduto: 'BELZ003', nomeProduto: 'Perfume Masculino 100ml', descricao: 'Perfume masculino amadeirado', idCategoria: 6, marca: 'Boticário', precoAtual: 189.90, unidadeMedida: 'UN' },
        { codigoProduto: 'BELZ004', nomeProduto: 'Base Líquida', descricao: 'Base líquida cobertura média', idCategoria: 6, marca: 'MAC', precoAtual: 249.90, unidadeMedida: 'UN' },
        { codigoProduto: 'BELZ005', nomeProduto: 'Kit Maquiagem', descricao: 'Kit maquiagem completo', idCategoria: 6, marca: 'Ruby Rose', precoAtual: 89.90, unidadeMedida: 'KIT' },
        // Livros e Papelaria
        { codigoProduto: 'LIVR001', nomeProduto: 'Livro Best Seller', descricao: 'Romance contemporâneo', idCategoria: 7, marca: 'Intrínseca', precoAtual: 49.90, unidadeMedida: 'UN' },
        { codigoProduto: 'LIVR002', nomeProduto: 'Caderno Universitário', descricao: 'Caderno 200 folhas', idCategoria: 7, marca: 'Tilibra', precoAtual: 24.90, unidadeMedida: 'UN' },
        { codigoProduto: 'LIVR003', nomeProduto: 'Kit Canetas Coloridas', descricao: 'Kit 12 canetas coloridas', idCategoria: 7, marca: 'BIC', precoAtual: 19.90, unidadeMedida: 'KIT' },
        { codigoProduto: 'LIVR004', nomeProduto: 'Agenda 2024', descricao: 'Agenda executiva 2024', idCategoria: 7, marca: 'Foroni', precoAtual: 34.90, unidadeMedida: 'UN' },
        { codigoProduto: 'LIVR005', nomeProduto: 'Calculadora Científica', descricao: 'Calculadora científica completa', idCategoria: 7, marca: 'Casio', precoAtual: 89.90, unidadeMedida: 'UN' },
        // Brinquedos
        { codigoProduto: 'BRIN001', nomeProduto: 'Lego Classic 500 peças', descricao: 'Kit Lego construção classic', idCategoria: 8, marca: 'Lego', precoAtual: 299.90, unidadeMedida: 'CX' },
        { codigoProduto: 'BRIN002', nomeProduto: 'Boneca Fashion', descricao: 'Boneca fashion com acessórios', idCategoria: 8, marca: 'Mattel', precoAtual: 149.90, unidadeMedida: 'UN' },
        { codigoProduto: 'BRIN003', nomeProduto: 'Quebra-cabeça 1000 peças', descricao: 'Quebra-cabeça paisagem', idCategoria: 8, marca: 'Grow', precoAtual: 59.90, unidadeMedida: 'CX' },
        { codigoProduto: 'BRIN004', nomeProduto: 'Carrinho Hot Wheels', descricao: 'Carrinho colecionável', idCategoria: 8, marca: 'Hot Wheels', precoAtual: 12.90, unidadeMedida: 'UN' },
        { codigoProduto: 'BRIN005', nomeProduto: 'Jogo de Tabuleiro', descricao: 'Jogo War clássico', idCategoria: 8, marca: 'Grow', precoAtual: 89.90, unidadeMedida: 'CX' },
    ];

    // Kysely typically returns the inserted rows with IDs.
    // However, to keep this simpler and closer to the SQL script's logic,
    // we'll assume IDs are sequential starting from 1 if not specified otherwise.
    // For tables where IDs are explicitly given (like 'produto' with 'id_produto'),
    // we use those. If your 'id_produto' is auto-generated, you'd need to fetch them.
    // The SQL provided has pre-defined IDs for product_fornecedor, which implies produto.id_produto is known.
    // Let's assume produto.id_produto is an auto-incrementing PK.
    // We need to insert and get their generated IDs.

    // For tables with auto-generated primary keys, Kysely's `returning` can fetch them.
    // The provided SQL for `produto` does not have an `id_produto` column in its INSERT.
    // It has `codigo_produto`. Assuming `id_produto` is the PK and auto-generated.
    // We'll insert products and then query them back to map `codigo_produto` to `id_produto`
    // if needed for foreign keys in other tables.
    // Or, if `id_categoria` refers to `categoria.id_categoria` (auto-incremented).

    await db.insertInto('produto').values(produtos.map(p => ({
        ...p,
        // idCategoria should map to the PK of 'categoria'
        // if 'id_categoria' in 'produto' table is indeed a FK to 'categoria.id_categoria'
        // and 'categoria.id_categoria' is auto-generated.
        // The provided SQL implies id_categoria values 1-8, matching the order of categoria inserts.
    }))).execute();
    console.log('Produtos inseridos.');

    // Retrieve inserted products to get their actual IDs if they are auto-generated
    // This is crucial if other tables reference `produto.id_produto`
    const insertedProdutos = await db.selectFrom('produto').selectAll().execute();
    const produtoIdMap = new Map(insertedProdutos.map(p => [p.codigoProduto, p.idProduto]));


    // ===============================================
    // INSERINDO LOJAS
    // ===============================================
    const lojas = [
        { codigoLoja: 'LJ001', nomeLoja: 'Loja Shopping Center', endereco: 'Av. Paulista, 1500', cidade: 'São Paulo', estado: 'SP', cep: '01310100', telefone: '11-3456-7890', gerente: 'Carlos Silva' },
        { codigoLoja: 'LJ002', nomeLoja: 'Loja Barra Shopping', endereco: 'Av. das Américas, 4666', cidade: 'Rio de Janeiro', estado: 'RJ', cep: '22640102', telefone: '21-2431-8900', gerente: 'Ana Santos' },
        { codigoLoja: 'LJ003', nomeLoja: 'Loja BH Shopping', endereco: 'Rod. BR-356, 3049', cidade: 'Belo Horizonte', estado: 'MG', cep: '31150900', telefone: '31-3456-7890', gerente: 'Pedro Oliveira' },
        { codigoLoja: 'LJ004', nomeLoja: 'Loja Recife Shopping', endereco: 'Av. Agamenon Magalhães, 1000', cidade: 'Recife', estado: 'PE', cep: '52070000', telefone: '81-3456-7890', gerente: 'Maria Costa' },
        { codigoLoja: 'LJ005', nomeLoja: 'Loja Salvador Shopping', endereco: 'Av. Tancredo Neves, 2915', cidade: 'Salvador', estado: 'BA', cep: '41820021', telefone: '71-3456-7890', gerente: 'João Pereira' },
        { codigoLoja: 'LJ006', nomeLoja: 'Loja Porto Alegre', endereco: 'Av. Diário de Notícias, 300', cidade: 'Porto Alegre', estado: 'RS', cep: '90810000', telefone: '51-3456-7890', gerente: 'Paula Lima' },
        { codigoLoja: 'LJ007', nomeLoja: 'Loja Brasília Shopping', endereco: 'SCN Q 6 L 2', cidade: 'Brasília', estado: 'DF', cep: '70716900', telefone: '61-3456-7890', gerente: 'Roberto Alves' },
        { codigoLoja: 'LJ008', nomeLoja: 'Loja Curitiba Shopping', endereco: 'Av. das Torres, 1700', cidade: 'Curitiba', estado: 'PR', cep: '82840730', telefone: '41-3456-7890', gerente: 'Juliana Martins' },
    ];
    await db.insertInto('loja').values(lojas).execute();
    console.log('Lojas inseridas.');
    const insertedLojas = await db.selectFrom('loja').selectAll().execute();
    const lojaIdMap = new Map(insertedLojas.map(l => [l.codigoLoja, l.idLoja]));


    // ===============================================
    // INSERINDO FUNCIONÁRIOS
    // ===============================================
    // Assumes id_loja in funcionario maps to a numeric ID.
    // The SQL has numeric id_loja (1, 2, 3, 4, 5). We need to map these to actual loja IDs.
    // For this seed, we'll assume the loja IDs are 1-8 based on insertion order,
    // matching the SQL. If they are not, this needs adjustment.
    const funcionarios = [
        // Loja SP (assuming idLoja 1)
        { codigoFuncionario: 'FUNC001', nome: 'Carlos Silva', cargo: 'Gerente', idLoja: lojaIdMap.get('LJ001'), salario: 8000.00 },
        { codigoFuncionario: 'FUNC002', nome: 'Mariana Rocha', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ001'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC003', nome: 'José Santos', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ001'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC004', nome: 'Laura Ferreira', cargo: 'Caixa', idLoja: lojaIdMap.get('LJ001'), salario: 2200.00 },
        // Loja RJ (assuming idLoja 2)
        { codigoFuncionario: 'FUNC005', nome: 'Ana Santos', cargo: 'Gerente', idLoja: lojaIdMap.get('LJ002'), salario: 8000.00 },
        { codigoFuncionario: 'FUNC006', nome: 'Bruno Costa', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ002'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC007', nome: 'Carla Almeida', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ002'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC008', nome: 'Diego Pereira', cargo: 'Caixa', idLoja: lojaIdMap.get('LJ002'), salario: 2200.00 },
        // Loja BH (assuming idLoja 3)
        { codigoFuncionario: 'FUNC009', nome: 'Pedro Oliveira', cargo: 'Gerente', idLoja: lojaIdMap.get('LJ003'), salario: 8000.00 },
        { codigoFuncionario: 'FUNC010', nome: 'Fernanda Lima', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ003'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC011', nome: 'Ricardo Silva', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ003'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC012', nome: 'Tatiana Souza', cargo: 'Caixa', idLoja: lojaIdMap.get('LJ003'), salario: 2200.00 },
        // Loja PE (assuming idLoja 4)
        { codigoFuncionario: 'FUNC013', nome: 'Maria Costa', cargo: 'Gerente', idLoja: lojaIdMap.get('LJ004'), salario: 8000.00 },
        { codigoFuncionario: 'FUNC014', nome: 'Anderson Melo', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ004'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC015', nome: 'Beatriz Nunes', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ004'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC016', nome: 'Cláudio Ribeiro', cargo: 'Caixa', idLoja: lojaIdMap.get('LJ004'), salario: 2200.00 },
        // Loja BA (assuming idLoja 5)
        { codigoFuncionario: 'FUNC017', nome: 'João Pereira', cargo: 'Gerente', idLoja: lojaIdMap.get('LJ005'), salario: 8000.00 },
        { codigoFuncionario: 'FUNC018', nome: 'Sandra Matos', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ005'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC019', nome: 'Marcos Dias', cargo: 'Vendedor', idLoja: lojaIdMap.get('LJ005'), salario: 2500.00 },
        { codigoFuncionario: 'FUNC020', nome: 'Elaine Barros', cargo: 'Caixa', idLoja: lojaIdMap.get('LJ005'), salario: 2200.00 },
    ];
    await db.insertInto('funcionario').values(funcionarios.filter(f => f.idLoja !== undefined) as any).execute(); // Cast to any to bypass strict type check if idLoja is potentially undefined due to map.get
    console.log('Funcionários inseridos.');
    const insertedFuncionarios = await db.selectFrom('funcionario').selectAll().execute();
    const funcionarioIdMap = new Map(insertedFuncionarios.map(f => [f.codigoFuncionario, f.idFuncionario]));

    // ===============================================
    // INSERINDO CLIENTES
    // ===============================================
    const clientes = [
        { cpf: '12345678901', nome: 'Paulo Henrique Silva', email: 'paulo.silva@email.com', telefone: '11-98765-4321', endereco: 'Rua das Flores, 123', cidade: 'São Paulo', estado: 'SP', cep: '01234567' },
        { cpf: '23456789012', nome: 'Ana Maria Santos', email: 'ana.santos@email.com', telefone: '11-97654-3210', endereco: 'Av. Paulista, 456', cidade: 'São Paulo', estado: 'SP', cep: '01310100' },
        { cpf: '34567890123', nome: 'Roberto Carlos Oliveira', email: 'roberto.oliveira@email.com', telefone: '21-96543-2109', endereco: 'Rua Copacabana, 789', cidade: 'Rio de Janeiro', estado: 'RJ', cep: '22020050' },
        { cpf: '45678901234', nome: 'Juliana Costa Lima', email: 'juliana.lima@email.com', telefone: '31-95432-1098', endereco: 'Av. Afonso Pena, 321', cidade: 'Belo Horizonte', estado: 'MG', cep: '30130005' },
        { cpf: '56789012345', nome: 'Fernando Alves Costa', email: 'fernando.costa@email.com', telefone: '81-94321-0987', endereco: 'Av. Boa Viagem, 654', cidade: 'Recife', estado: 'PE', cep: '51020180' },
        { cpf: '67890123456', nome: 'Mariana Ferreira Souza', email: 'mariana.souza@email.com', telefone: '71-93210-9876', endereco: 'Av. Oceânica, 987', cidade: 'Salvador', estado: 'BA', cep: '40160060' },
        { cpf: '78901234567', nome: 'Alexandre Martins Silva', email: 'alexandre.silva@email.com', telefone: '51-92109-8765', endereco: 'Rua da Praia, 147', cidade: 'Porto Alegre', estado: 'RS', cep: '90020060' },
        { cpf: '89012345678', nome: 'Camila Rodrigues Santos', email: 'camila.santos@email.com', telefone: '61-91098-7654', endereco: 'SQS 308 Bloco C', cidade: 'Brasília', estado: 'DF', cep: '70355030' },
        { cpf: '90123456789', nome: 'Ricardo Pereira Lima', email: 'ricardo.lima@email.com', telefone: '41-90987-6543', endereco: 'Rua XV de Novembro, 258', cidade: 'Curitiba', estado: 'PR', cep: '80020310' },
        { cpf: '01234567890', nome: 'Patricia Almeida Costa', email: 'patricia.costa@email.com', telefone: '11-89876-5432', endereco: 'Alameda Santos, 369', cidade: 'São Paulo', estado: 'SP', cep: '01419002' },
        { cpf: '11223344556', nome: 'Bruno Carvalho Dias', email: 'bruno.dias@email.com', telefone: '21-88765-4321', endereco: 'Av. Rio Branco, 741', cidade: 'Rio de Janeiro', estado: 'RJ', cep: '20040008' },
        { cpf: '22334455667', nome: 'Letícia Nunes Oliveira', email: 'leticia.oliveira@email.com', telefone: '31-87654-3210', endereco: 'Rua da Bahia, 852', cidade: 'Belo Horizonte', estado: 'MG', cep: '30160011' },
        { cpf: '33445566778', nome: 'Carlos Eduardo Santos', email: 'carlos.santos@email.com', telefone: '81-86543-2109', endereco: 'Rua do Sol, 963', cidade: 'Recife', estado: 'PE', cep: '50030230' },
        { cpf: '44556677889', nome: 'Daniela Sousa Lima', email: 'daniela.lima@email.com', telefone: '71-85432-1098', endereco: 'Av. Sete de Setembro, 159', cidade: 'Salvador', estado: 'BA', cep: '40060500' },
        { cpf: '55667788990', nome: 'Marcelo Ferreira Costa', email: 'marcelo.costa@email.com', telefone: '51-84321-0987', endereco: 'Av. Ipiranga, 753', cidade: 'Porto Alegre', estado: 'RS', cep: '90160091' },
    ];
    await db.insertInto('cliente').values(clientes).execute();
    console.log('Clientes inseridos.');
    const insertedClientes = await db.selectFrom('cliente').selectAll().execute();
    // CPF is likely the business key, idCliente is the PK.
    const clienteIdMap = new Map(insertedClientes.map(c => [c.cpf, c.idCliente]));


    // ===============================================
    // INSERINDO FORNECEDORES
    // ===============================================
    const fornecedores = [
        { cnpj: '12345678000100', razaoSocial: 'Samsung Eletrônicos do Brasil LTDA', nomeFantasia: 'Samsung Brasil', telefone: '11-5644-2000', email: 'contato@samsung.com.br', endereco: 'Av. Dr. Chucri Zaidan, 1240', cidade: 'São Paulo', estado: 'SP' },
        { cnpj: '23456789000111', razaoSocial: 'Dell Computadores do Brasil LTDA', nomeFantasia: 'Dell Brasil', telefone: '11-5503-5000', email: 'vendas@dell.com.br', endereco: 'Av. Industrial, 700', cidade: 'Eldorado do Sul', estado: 'RS' },
        { cnpj: '34567890000122', razaoSocial: 'Nestlé Brasil LTDA', nomeFantasia: 'Nestlé', telefone: '11-2199-2999', email: 'faleconosco@nestle.com.br', endereco: 'Av. Nações Unidas, 12495', cidade: 'São Paulo', estado: 'SP' },
        { cnpj: '45678901000133', razaoSocial: 'Nike do Brasil Com. e Part. LTDA', nomeFantasia: 'Nike Brasil', telefone: '11-5102-4400', email: 'atendimento@nike.com.br', endereco: 'Av. das Nações Unidas, 14261', cidade: 'São Paulo', estado: 'SP' },
        { cnpj: '56789012000144', razaoSocial: 'Tramontina S.A.', nomeFantasia: 'Tramontina', telefone: '54-3461-8200', email: 'sac@tramontina.com.br', endereco: 'Rod. RS-324 Km 2,5', cidade: 'Carlos Barbosa', estado: 'RS' },
        { cnpj: '67890123000155', razaoSocial: 'Procter & Gamble do Brasil S.A.', nomeFantasia: 'P&G Brasil', telefone: '11-3046-5800', email: 'atendimento@pg.com.br', endereco: 'Av. Brigadeiro Faria Lima, 3900', cidade: 'São Paulo', estado: 'SP' },
        { cnpj: '78901234000166', razaoSocial: 'Mattel do Brasil LTDA', nomeFantasia: 'Mattel', telefone: '11-5090-8500', email: 'sac@mattel.com.br', endereco: 'Av. Tamboré, 1400', cidade: 'Barueri', estado: 'SP' },
        { cnpj: '89012345000177', razaoSocial: 'Editora Intrínseca LTDA', nomeFantasia: 'Intrínseca', telefone: '21-2206-7400', email: 'contato@intrinseca.com.br', endereco: 'Rua Marquês de São Vicente, 99', cidade: 'Rio de Janeiro', estado: 'RJ' },
        { cnpj: '90123456000188', razaoSocial: 'JBL do Brasil', nomeFantasia: 'JBL', telefone: '11-3048-1700', email: 'suporte@jbl.com.br', endereco: 'Rua James Clerk Maxwell, 170', cidade: 'Campinas', estado: 'SP' },
        { cnpj: '01234567000199', razaoSocial: 'Melitta do Brasil', nomeFantasia: 'Melitta', telefone: '47-3801-5000', email: 'sac@melitta.com.br', endereco: 'Rua Dona Francisca, 8300', cidade: 'Joinville', estado: 'SC' },
    ];
    await db.insertInto('fornecedor').values(fornecedores).execute();
    console.log('Fornecedores inseridos.');
    const insertedFornecedores = await db.selectFrom('fornecedor').selectAll().execute();
    // CNPJ is the business key, idFornecedor is the PK.
    const fornecedorIdMap = new Map(insertedFornecedores.map(f => [f.cnpj, f.idFornecedor]));


    // ===============================================
    // INSERINDO PRODUTOS X FORNECEDORES
    // ===============================================
    // This table uses id_produto and id_fornecedor.
    // The SQL script uses numeric IDs (1, 2, etc.). We need to map these to our actual PKs.
    // Assuming the numeric IDs in the SQL correspond to the order of insertion OR known fixed IDs.
    // For this script, we will map them using the maps created above.
    // The SQL provided implies product IDs are 1-40 and fornecedor IDs 1-10.
    // We'll map based on the `codigoProduto` for products and `cnpj` for fornecedores if direct ID mapping is not robust.
    // Let's assume the SQL IDs 1,2,3 for products refer to the first, second, third product in *our* `produtos` array.
    // This is brittle. A better way is to use business keys (codigoProduto, cnpj) to look up the generated PKs.

    const produtoFornecedorData = [
        // Samsung (idFornecedor: 1 based on SQL) - We'll use cnpj '12345678000100'
        { idProdutoCodigo: 'ELET001', idFornecedorCnpj: '12345678000100', precoCompra: 2800.00, prazoEntrega: 7 }, // Produto 1: Smartphone Galaxy S22
        { idProdutoCodigo: 'ELET003', idFornecedorCnpj: '12345678000100', precoCompra: 1800.00, prazoEntrega: 10 }, // Produto 3: TV Smart 50" 4K

        // Dell (idFornecedor: 2) - cnpj '23456789000111'
        { idProdutoCodigo: 'ELET002', idFornecedorCnpj: '23456789000111', precoCompra: 2300.00, prazoEntrega: 15 }, // Produto 2: Notebook Dell

        // Nestlé (idFornecedor: 3) - cnpj '34567890000122'
        { idProdutoCodigo: 'ALIM002', idFornecedorCnpj: '34567890000122', precoCompra: 20.00, prazoEntrega: 5 }, // Produto 7: Chocolate (SQL uses 7, corresponds to ALIM002)
        { idProdutoCodigo: 'ALIM003', idFornecedorCnpj: '34567890000122', precoCompra: 6.50, prazoEntrega: 5 }, // Produto 8: Água Mineral (SQL uses 8, corresponds to ALIM003)

        // Nike (idFornecedor: 4) - cnpj '45678901000133'
        { idProdutoCodigo: 'VEST003', idFornecedorCnpj: '45678901000133', precoCompra: 320.00, prazoEntrega: 10 }, // Produto 13: Tênis Running (SQL uses 13, VEST003)

        // Tramontina (idFornecedor: 5) - cnpj '56789012000144'
        { idProdutoCodigo: 'CASA001', idFornecedorCnpj: '56789012000144', precoCompra: 240.00, prazoEntrega: 7 }, // Produto 16: Jogo de Panelas (SQL uses 16, CASA001)

        // P&G (idFornecedor: 6) - cnpj '67890123000155'
        { idProdutoCodigo: 'BELZ001', idFornecedorCnpj: '67890123000155', precoCompra: 14.50, prazoEntrega: 5 }, // Produto 21: Shampoo (SQL uses 21, BELZ001)
        { idProdutoCodigo: 'BELZ002', idFornecedorCnpj: '67890123000155', precoCompra: 19.00, prazoEntrega: 5 }, // Produto 22: Creme Hidratante (SQL uses 22, BELZ002)
        { idProdutoCodigo: 'BELZ005', idFornecedorCnpj: '67890123000155', precoCompra: 69.90, prazoEntrega: 7 }, // Produto 25: Kit Maquiagem (SQL uses 25, BELZ005)

        // Mattel (idFornecedor: 7) - cnpj '78901234000166'
        { idProdutoCodigo: 'BRIN002', idFornecedorCnpj: '78901234000166', precoCompra: 120.00, prazoEntrega: 10 }, // Produto 37: Boneca Fashion (SQL uses 37, BRIN002)
        { idProdutoCodigo: 'BRIN004', idFornecedorCnpj: '78901234000166', precoCompra: 9.90, prazoEntrega: 5 }, // Produto 40: Carrinho Hot Wheels (SQL uses 40, BRIN004)

        // Intrínseca (idFornecedor: 8) - cnpj '89012345000177'
        { idProdutoCodigo: 'LIVR001', idFornecedorCnpj: '89012345000177', precoCompra: 39.00, prazoEntrega: 7 }, // Produto 31: Livro Best Seller (SQL uses 31, LIVR001)

        // JBL (idFornecedor: 9) - cnpj '90123456000188'
        { idProdutoCodigo: 'ELET004', idFornecedorCnpj: '90123456000188', precoCompra: 199.00, prazoEntrega: 5 }, // Produto 4: Fone Bluetooth (SQL uses 4, ELET004)

        // Melitta (idFornecedor: 10) - cnpj '01234567000199'
        { idProdutoCodigo: 'ALIM001', idFornecedorCnpj: '01234567000199', precoCompra: 19.90, prazoEntrega: 3 }, // Produto 6: Café Premium (SQL uses 6, ALIM001)
    ];

    const produtoFornecedorValues = produtoFornecedorData.map(pf => ({
        idProduto: produtoIdMap.get(pf.idProdutoCodigo),
        idFornecedor: fornecedorIdMap.get(pf.idFornecedorCnpj),
        precoCompra: pf.precoCompra,
        prazoEntrega: pf.prazoEntrega,
    })).filter(pf => pf.idProduto !== undefined && pf.idFornecedor !== undefined);

    if (produtoFornecedorValues.length > 0) {
        await db.insertInto('produtoFornecedor').values(produtoFornecedorValues as any).execute();
        console.log('Produto x Fornecedor inseridos.');
    } else {
        console.log('Nenhum Produto x Fornecedor para inserir (verifique mapeamento de IDs).');
    }

    // ===============================================
    // INSERINDO VENDAS
    // ===============================================
    // Mapping client IDs (1-15 from SQL) and loja IDs (1-8 from SQL)
    // and funcionario IDs (1-20 from SQL)
    // We use the maps created earlier.
    const vendas = [
        { numeroVenda: 'VD202401001', idClienteCpf: '12345678901', idLojaCodigo: 'LJ001', idFuncionarioCodigo: 'FUNC002', dataVenda: '2024-01-15 10:30:00', valorTotal: 3698.90, descontoTotal: 0.00, formaPagamento: 'Cartão Crédito', statusVenda: 'Finalizada' },
        { numeroVenda: 'VD202401002', idClienteCpf: '23456789012', idLojaCodigo: 'LJ001', idFuncionarioCodigo: 'FUNC003', dataVenda: '2024-01-15 14:45:00', valorTotal: 449.80, descontoTotal: 44.98, formaPagamento: 'PIX', statusVenda: 'Finalizada' },
        { numeroVenda: 'VD202401003', idClienteCpf: '34567890123', idLojaCodigo: 'LJ002', idFuncionarioCodigo: 'FUNC006', dataVenda: '2024-01-16 11:00:00', valorTotal: 2199.00, descontoTotal: 0.00, formaPagamento: 'Cartão Débito', statusVenda: 'Finalizada' },
        { numeroVenda: 'VD202401004', idClienteCpf: '45678901234', idLojaCodigo: 'LJ003', idFuncionarioCodigo: 'FUNC010', dataVenda: '2024-01-17 15:30:00', valorTotal: 279.80, descontoTotal: 27.98, formaPagamento: 'Dinheiro', statusVenda: 'Finalizada' },
        { numeroVenda: 'VD202401005', idClienteCpf: '56789012345', idLojaCodigo: 'LJ004', idFuncionarioCodigo: 'FUNC014', dataVenda: '2024-01-18 09:15:00', valorTotal: 519.70, descontoTotal: 0.00, formaPagamento: 'Cartão Crédito', statusVenda: 'Finalizada' },
        { numeroVenda: 'VD202401006', idClienteCpf: '67890123456', idLojaCodigo: 'LJ005', idFuncionarioCodigo: 'FUNC018', dataVenda: '2024-01-19 16:00:00', valorTotal: 89.90, descontoTotal: 0.00, formaPagamento: 'PIX', statusVenda: 'Finalizada' },
        { numeroVenda: 'VD202401007', idClienteCpf: '78901234567', idLojaCodigo: 'LJ006', idFuncionarioCodigo: 'FUNC002', dataVenda: '2024-01-20 10:45:00', valorTotal: 1499.00, descontoTotal: 149.90, formaPagamento: 'Cartão Crédito', statusVenda: 'Finalizada' }, // Funcionario 2 (Mariana Rocha) from Loja 1 (LJ001), but venda in Loja 6 (LJ006). Assuming data is correct.
        { numeroVenda: 'VD202401008', idClienteCpf: '89012345678', idLojaCodigo: 'LJ007', idFuncionarioCodigo: 'FUNC003', dataVenda: '2024-01-21 13:20:00', valorTotal: 349.70, descontoTotal: 0.00, formaPagamento: 'Cartão Débito', statusVenda: 'Finalizada' }, // Funcionario 3 from Loja 1.
        { numeroVenda: 'VD202401009', idClienteCpf: '90123456789', idLojaCodigo: 'LJ008', idFuncionarioCodigo: 'FUNC004', dataVenda: '2024-01-22 11:30:00', valorTotal: 169.80, descontoTotal: 16.98, formaPagamento: 'PIX', statusVenda: 'Finalizada' }, // Funcionario 4 from Loja 1.
        { numeroVenda: 'VD202401010', idClienteCpf: '01234567890', idLojaCodigo: 'LJ001', idFuncionarioCodigo: 'FUNC005', dataVenda: '2024-01-23 14:00:00', valorTotal: 787.50, descontoTotal: 0.00, formaPagamento: 'Cartão Crédito', statusVenda: 'Finalizada' }, // Funcionario 5 (Ana Santos) from Loja 2.
        { numeroVenda: 'VD202402001', idClienteCpf: '11223344556', idLojaCodigo: 'LJ002', idFuncionarioCodigo: 'FUNC006', dataVenda: '2024-02-01 09:30:00', valorTotal: 4298.80, descontoTotal: 429.88, formaPagamento: 'Cartão Crédito', statusVenda: 'Finalizada' },
        { numeroVenda: 'VD202402002', idClienteCpf: '22334455667', idLojaCodigo: 'LJ003', idFuncionarioCodigo: 'FUNC007', dataVenda: '2024-02-02 15:45:00', valorTotal: 199.90, descontoTotal: 0.00, formaPagamento: 'PIX', statusVenda: 'Finalizada' }, // Funcionario 7 from Loja 2
        { numeroVenda: 'VD202402003', idClienteCpf: '33445566778', idLojaCodigo: 'LJ004', idFuncionarioCodigo: 'FUNC008', dataVenda: '2024-02-03 10:15:00', valorTotal: 659.60, descontoTotal: 65.96, formaPagamento: 'Cartão Débito', statusVenda: 'Finalizada' }, // Funcionario 8 from Loja 2
        { numeroVenda: 'VD202402004', idClienteCpf: '44556677889', idLojaCodigo: 'LJ005', idFuncionarioCodigo: 'FUNC009', dataVenda: '2024-02-04 14:30:00', valorTotal: 89.90, descontoTotal: 0.00, formaPagamento: 'Dinheiro', statusVenda: 'Finalizada' }, // Funcionario 9 from Loja 3
        { numeroVenda: 'VD202402005', idClienteCpf: '55667788990', idLojaCodigo: 'LJ006', idFuncionarioCodigo: 'FUNC010', dataVenda: '2024-02-05 11:00:00', valorTotal: 349.80, descontoTotal: 34.98, formaPagamento: 'PIX', statusVenda: 'Finalizada' }, // Funcionario 10 from Loja 3
    ];

    const vendaValues = vendas.map(v => ({
        ...v,
        idCliente: clienteIdMap.get(v.idClienteCpf),
        idLoja: lojaIdMap.get(v.idLojaCodigo),
        idFuncionario: funcionarioIdMap.get(v.idFuncionarioCodigo),
        dataVenda: new Date(v.dataVenda), // Ensure dates are JS Date objects
    })).filter(v => v.idCliente !== undefined && v.idLoja !== undefined && v.idFuncionario !== undefined);


    // Filter out unnecessary fields before insertion
    const cleanVendaValues = vendaValues.map(({ idClienteCpf, idLojaCodigo, idFuncionarioCodigo, ...rest }) => rest);


    await db.insertInto('venda').values(cleanVendaValues as any).execute();
    console.log('Vendas inseridas.');

    // Retrieve inserted vendas to map numero_venda to id_venda for item_venda
    const insertedVendas = await db.selectFrom('venda').selectAll().execute();
    const vendaIdMap = new Map(insertedVendas.map(v => [v.numeroVenda, v.idVenda]));

    // ===============================================
    // INSERINDO ITENS DAS VENDAS
    // ===============================================
    // SQL has id_venda (1-15). We need to map these to actual venda IDs.
    // And id_produto (1-40). Map using produtoIdMap.
    const itensVenda = [
        // Venda 1 (VD202401001)
        { numeroVenda: 'VD202401001', idProdutoCodigo: 'ELET001', quantidade: 1, precoUnitario: 3499.00, desconto: 0.00, valorTotal: 3499.00 },
        { numeroVenda: 'VD202401001', idProdutoCodigo: 'ELET004', quantidade: 1, precoUnitario: 199.90, desconto: 0.00, valorTotal: 199.90 },
        // Venda 2 (VD202401002)
        { numeroVenda: 'VD202401002', idProdutoCodigo: 'ALIM001', quantidade: 2, precoUnitario: 24.90, desconto: 2.49, valorTotal: 47.31 }, // SQL uses produto 6 (ALIM001)
        { numeroVenda: 'VD202401002', idProdutoCodigo: 'ALIM003', quantidade: 3, precoUnitario: 8.90, desconto: 0.89, valorTotal: 24.87 }, // SQL uses produto 8 (ALIM003), but preco_unitario 8.90 matches ALIM002 (Chocolate). Assuming ALIM003. The SQL data is inconsistent. Using ALIM003.
        { numeroVenda: 'VD202401002', idProdutoCodigo: 'VEST003', quantidade: 1, precoUnitario: 399.90, desconto: 39.99, valorTotal: 359.91 }, // SQL uses produto 13 (VEST003)
        // Venda 3 (VD202401003)
        { numeroVenda: 'VD202401003', idProdutoCodigo: 'ELET003', quantidade: 1, precoUnitario: 2199.00, desconto: 0.00, valorTotal: 2199.00 }, // SQL uses produto 3 (ELET003)
        // Venda 4 (VD202401004)
        { numeroVenda: 'VD202401004', idProdutoCodigo: 'CASA001', quantidade: 1, precoUnitario: 299.90, desconto: 29.99, valorTotal: 269.91 }, // SQL uses produto 16 (CASA001)
        { numeroVenda: 'VD202401004', idProdutoCodigo: 'BELZ001', quantidade: 1, precoUnitario: 18.90, desconto: 1.89, valorTotal: 17.01 }, // SQL uses produto 21 (BELZ001)
        // Venda 5 (VD202401005)
        { numeroVenda: 'VD202401005', idProdutoCodigo: 'VEST001', quantidade: 1, precoUnitario: 189.90, desconto: 0.00, valorTotal: 189.90 }, // SQL uses produto 11 (VEST001)
        { numeroVenda: 'VD202401005', idProdutoCodigo: 'VEST002', quantidade: 1, precoUnitario: 259.90, desconto: 0.00, valorTotal: 259.90 }, // SQL uses produto 12 (VEST002)
        { numeroVenda: 'VD202401005', idProdutoCodigo: 'LIVR001', quantidade: 1, precoUnitario: 49.90, desconto: 0.00, valorTotal: 49.90 }, // SQL uses produto 26 (LIVR001) - Note: SQL has produto 26 as Livro Best Seller, in our data it's LIVR001.
        // Venda 6 (VD202401006)
        { numeroVenda: 'VD202401006', idProdutoCodigo: 'LIVR005', quantidade: 1, precoUnitario: 89.90, desconto: 0.00, valorTotal: 89.90 }, // SQL uses produto 35 (LIVR005 Calculadora)
        // Venda 7 (VD202401007)
        { numeroVenda: 'VD202401007', idProdutoCodigo: 'ESPO004', quantidade: 1, precoUnitario: 1499.00, desconto: 149.90, valorTotal: 1349.10 }, // SQL uses produto 19 (ESPO004 Bicicleta)
        // Venda 8 (VD202401008)
        { numeroVenda: 'VD202401008', idProdutoCodigo: 'BELZ002', quantidade: 2, precoUnitario: 24.90, desconto: 0.00, valorTotal: 49.80 }, // SQL uses produto 22 (BELZ002 Creme)
        { numeroVenda: 'VD202401008', idProdutoCodigo: 'CASA002', quantidade: 1, precoUnitario: 189.90, desconto: 0.00, valorTotal: 189.90 }, // SQL uses produto 17 (CASA002 Edredom)
        { numeroVenda: 'VD202401008', idProdutoCodigo: 'LIVR003', quantidade: 1, precoUnitario: 59.90, desconto: 0.00, valorTotal: 59.90 }, // SQL uses produto 33 (LIVR003 Canetas). Price mismatch (19.90 vs 59.90). Using SQL price.
        // Venda 9 (VD202401009)
        { numeroVenda: 'VD202401009', idProdutoCodigo: 'ALIM004', quantidade: 2, precoUnitario: 4.50, desconto: 0.45, valorTotal: 8.55 }, // SQL uses produto 9 (ALIM004 Biscoito)
        { numeroVenda: 'VD202401009', idProdutoCodigo: 'BRIN002', quantidade: 1, precoUnitario: 149.90, desconto: 14.99, valorTotal: 134.91 }, // SQL uses produto 37 (BRIN002 Boneca)
        // Venda 10 (VD202401010)
        { numeroVenda: 'VD202401010', idProdutoCodigo: 'ELET002', quantidade: 1, precoUnitario: 2899.00, desconto: 0.00, valorTotal: 2899.00 }, // SQL uses produto 2 (ELET002 Notebook) - Price in product table is 2899, matches.
        { numeroVenda: 'VD202401010', idProdutoCodigo: 'ELET005', quantidade: 1, precoUnitario: 199.90, desconto: 0.00, valorTotal: 199.90 }, // SQL uses produto 5 (ELET005 Mouse)
        // Venda 11 (VD202402001)
        { numeroVenda: 'VD202402001', idProdutoCodigo: 'ELET001', quantidade: 1, precoUnitario: 3499.00, desconto: 349.90, valorTotal: 3149.10 }, // SQL uses produto 1 (ELET001 Smartphone)
        { numeroVenda: 'VD202402001', idProdutoCodigo: 'BELZ005', quantidade: 1, precoUnitario: 89.90, desconto: 8.99, valorTotal: 80.91 }, // SQL uses produto 25 (BELZ005 Kit Maquiagem)
        // Venda 12 (VD202402002)
        { numeroVenda: 'VD202402002', idProdutoCodigo: 'LIVR004', quantidade: 1, precoUnitario: 199.90, desconto: 0.00, valorTotal: 199.90 }, // SQL uses produto 34 (LIVR004 Agenda). Price mismatch (34.90 vs 199.90). Using SQL price.
        // Venda 13 (VD202402003)
        { numeroVenda: 'VD202402003', idProdutoCodigo: 'VEST003', quantidade: 1, precoUnitario: 399.90, desconto: 39.99, valorTotal: 359.91 }, // SQL uses produto 13 (VEST003 Tênis)
        { numeroVenda: 'VD202402003', idProdutoCodigo: 'VEST004', quantidade: 1, precoUnitario: 119.90, desconto: 11.99, valorTotal: 107.91 }, // SQL uses produto 14 (VEST004 Vestido)
        { numeroVenda: 'VD202402003', idProdutoCodigo: 'VEST005', quantidade: 1, precoUnitario: 149.90, desconto: 14.99, valorTotal: 134.91 }, // SQL uses produto 15 (VEST005 Mochila)
        // Venda 14 (VD202402004)
        { numeroVenda: 'VD202402004', idProdutoCodigo: 'BRIN003', quantidade: 1, precoUnitario: 89.90, desconto: 0.00, valorTotal: 89.90 }, // SQL uses produto 38 (BRIN003 Quebra-cabeça). Price mismatch (59.90 vs 89.90). Using SQL price.
        // Venda 15 (VD202402005)
        { numeroVenda: 'VD202402005', idProdutoCodigo: 'ESPO003', quantidade: 2, precoUnitario: 39.90, desconto: 3.99, valorTotal: 71.82 }, // SQL uses produto 18 (ESPO003 Tapete Yoga). Price mismatch (79.90 vs 39.90). Using SQL price.
        { numeroVenda: 'VD202402005', idProdutoCodigo: 'BELZ003', quantidade: 1, precoUnitario: 249.90, desconto: 24.99, valorTotal: 224.91 }, // SQL uses produto 23 (BELZ003 Perfume). Price mismatch (189.90 vs 249.90). Using SQL price.
    ];

    const itemVendaValues = itensVenda.map(iv => ({
        idVenda: vendaIdMap.get(iv.numeroVenda),
        idProduto: produtoIdMap.get(iv.idProdutoCodigo),
        quantidade: iv.quantidade,
        precoUnitario: iv.precoUnitario,
        desconto: iv.desconto,
        valorTotal: iv.valorTotal,
    })).filter(iv => iv.idVenda !== undefined && iv.idProduto !== undefined);

    if (itemVendaValues.length > 0) {
        await db.insertInto('itemVenda').values(itemVendaValues as any).execute();
        console.log('Itens de Venda inseridos.');
    } else {
        console.log('Nenhum Item de Venda para inserir (verifique mapeamento de IDs).');
    }


    // ===============================================
    // INSERINDO ESTOQUE
    // ===============================================
    // SQL uses id_produto (1-30) and id_loja (1-5)
    const estoqueData = [
        // Loja SP (LJ001)
        { idProdutoCodigo: 'ELET001', idLojaCodigo: 'LJ001', quantidadeAtual: 25, quantidadeMinima: 5, quantidadeMaxima: 50 },
        { idProdutoCodigo: 'ELET002', idLojaCodigo: 'LJ001', quantidadeAtual: 15, quantidadeMinima: 3, quantidadeMaxima: 30 },
        { idProdutoCodigo: 'ELET003', idLojaCodigo: 'LJ001', quantidadeAtual: 20, quantidadeMinima: 5, quantidadeMaxima: 40 },
        { idProdutoCodigo: 'ELET004', idLojaCodigo: 'LJ001', quantidadeAtual: 50, quantidadeMinima: 10, quantidadeMaxima: 100 },
        { idProdutoCodigo: 'ELET005', idLojaCodigo: 'LJ001', quantidadeAtual: 45, quantidadeMinima: 10, quantidadeMaxima: 80 },
        { idProdutoCodigo: 'ALIM001', idLojaCodigo: 'LJ001', quantidadeAtual: 200, quantidadeMinima: 50, quantidadeMaxima: 400 }, // Prod 6
        { idProdutoCodigo: 'ALIM002', idLojaCodigo: 'LJ001', quantidadeAtual: 150, quantidadeMinima: 30, quantidadeMaxima: 300 }, // Prod 7
        // Loja RJ (LJ002)
        { idProdutoCodigo: 'ELET001', idLojaCodigo: 'LJ002', quantidadeAtual: 20, quantidadeMinima: 5, quantidadeMaxima: 40 }, // Prod 1
        { idProdutoCodigo: 'ELET003', idLojaCodigo: 'LJ002', quantidadeAtual: 15, quantidadeMinima: 3, quantidadeMaxima: 30 }, // Prod 3
        { idProdutoCodigo: 'ALIM003', idLojaCodigo: 'LJ002', quantidadeAtual: 180, quantidadeMinima: 40, quantidadeMaxima: 350 }, // Prod 8
        { idProdutoCodigo: 'ALIM004', idLojaCodigo: 'LJ002', quantidadeAtual: 220, quantidadeMinima: 50, quantidadeMaxima: 400 }, // Prod 9
        { idProdutoCodigo: 'ALIM005', idLojaCodigo: 'LJ002', quantidadeAtual: 240, quantidadeMinima: 50, quantidadeMaxima: 450 }, // Prod 10
        { idProdutoCodigo: 'VEST001', idLojaCodigo: 'LJ002', quantidadeAtual: 30, quantidadeMinima: 10, quantidadeMaxima: 60 }, // Prod 11
        { idProdutoCodigo: 'VEST002', idLojaCodigo: 'LJ002', quantidadeAtual: 25, quantidadeMinima: 10, quantidadeMaxima: 50 }, // Prod 12
        // Loja BH (LJ003)
        { idProdutoCodigo: 'VEST003', idLojaCodigo: 'LJ003', quantidadeAtual: 35, quantidadeMinima: 10, quantidadeMaxima: 70 }, // Prod 13
        { idProdutoCodigo: 'VEST004', idLojaCodigo: 'LJ003', quantidadeAtual: 40, quantidadeMinima: 10, quantidadeMaxima: 80 }, // Prod 14
        { idProdutoCodigo: 'VEST005', idLojaCodigo: 'LJ003', quantidadeAtual: 30, quantidadeMinima: 10, quantidadeMaxima: 60 }, // Prod 15
        { idProdutoCodigo: 'CASA001', idLojaCodigo: 'LJ003', quantidadeAtual: 20, quantidadeMinima: 5, quantidadeMaxima: 40 }, // Prod 16
        { idProdutoCodigo: 'CASA002', idLojaCodigo: 'LJ003', quantidadeAtual: 25, quantidadeMinima: 5, quantidadeMaxima: 50 }, // Prod 17
        { idProdutoCodigo: 'CASA003', idLojaCodigo: 'LJ003', quantidadeAtual: 15, quantidadeMinima: 5, quantidadeMaxima: 30 }, // Prod 18
        // Loja PE (LJ004)
        { idProdutoCodigo: 'ESPO004', idLojaCodigo: 'LJ004', quantidadeAtual: 8, quantidadeMinima: 2, quantidadeMaxima: 15 }, // Prod 19: Bicicleta Aro 29 - Original SQL ID
        { idProdutoCodigo: 'ESPO005', idLojaCodigo: 'LJ004', quantidadeAtual: 45, quantidadeMinima: 10, quantidadeMaxima: 90 }, // Prod 20: Corda de Pular
        { idProdutoCodigo: 'BELZ001', idLojaCodigo: 'LJ004', quantidadeAtual: 80, quantidadeMinima: 20, quantidadeMaxima: 150 }, // Prod 21: Shampoo
        { idProdutoCodigo: 'BELZ002', idLojaCodigo: 'LJ004', quantidadeAtual: 90, quantidadeMinima: 20, quantidadeMaxima: 180 }, // Prod 22: Creme Hidratante
        { idProdutoCodigo: 'BELZ003', idLojaCodigo: 'LJ004', quantidadeAtual: 12, quantidadeMinima: 3, quantidadeMaxima: 25 }, // Prod 23: Perfume
        { idProdutoCodigo: 'BELZ004', idLojaCodigo: 'LJ004', quantidadeAtual: 18, quantidadeMinima: 5, quantidadeMaxima: 35 }, // Prod 24: Base Líquida
        // Loja BA (LJ005)
        { idProdutoCodigo: 'BELZ005', idLojaCodigo: 'LJ005', quantidadeAtual: 30, quantidadeMinima: 10, quantidadeMaxima: 60 }, // Prod 25: Kit Maquiagem
        { idProdutoCodigo: 'LIVR001', idLojaCodigo: 'LJ005', quantidadeAtual: 35, quantidadeMinima: 10, quantidadeMaxima: 70 }, // Prod 26: Livro Best Seller
        { idProdutoCodigo: 'LIVR002', idLojaCodigo: 'LJ005', quantidadeAtual: 85, quantidadeMinima: 20, quantidadeMaxima: 170 }, // Prod 27: Caderno
        { idProdutoCodigo: 'LIVR003', idLojaCodigo: 'LJ005', quantidadeAtual: 65, quantidadeMinima: 15, quantidadeMaxima: 130 }, // Prod 28: Kit Canetas
        { idProdutoCodigo: 'LIVR004', idLojaCodigo: 'LJ005', quantidadeAtual: 50, quantidadeMinima: 10, quantidadeMaxima: 100 }, // Prod 29: Agenda
        { idProdutoCodigo: 'LIVR005', idLojaCodigo: 'LJ005', quantidadeAtual: 40, quantidadeMinima: 10, quantidadeMaxima: 80 }, // Prod 30: Calculadora
    ];

    const estoqueValues = estoqueData.map(e => ({
        idProduto: produtoIdMap.get(e.idProdutoCodigo),
        idLoja: lojaIdMap.get(e.idLojaCodigo),
        quantidadeAtual: e.quantidadeAtual,
        quantidadeMinima: e.quantidadeMinima,
        quantidadeMaxima: e.quantidadeMaxima,
    })).filter(e => e.idProduto !== undefined && e.idLoja !== undefined);

    if (estoqueValues.length > 0) {
        await db.insertInto('estoque').values(estoqueValues as any).execute();
        console.log('Estoque inserido.');
    } else {
        console.log('Nenhum Estoque para inserir (verifique mapeamento de IDs).');
    }


    // ===============================================
    // INSERINDO COMPRAS
    // ===============================================
    const compras = [
        { numeroCompra: 'CP202401001', idFornecedorCnpj: '12345678000100', idLojaCodigo: 'LJ001', dataCompra: '2024-01-05 09:00:00', valorTotal: 28000.00, statusCompra: 'Recebida' },
        { numeroCompra: 'CP202401002', idFornecedorCnpj: '23456789000111', idLojaCodigo: 'LJ001', dataCompra: '2024-01-08 10:30:00', valorTotal: 11500.00, statusCompra: 'Recebida' },
        { numeroCompra: 'CP202401003', idFornecedorCnpj: '34567890000122', idLojaCodigo: 'LJ002', dataCompra: '2024-01-10 14:00:00', valorTotal: 1355.00, statusCompra: 'Recebida' },
        { numeroCompra: 'CP202401004', idFornecedorCnpj: '45678901000133', idLojaCodigo: 'LJ003', dataCompra: '2024-01-12 11:15:00', valorTotal: 6400.00, statusCompra: 'Recebida' },
        { numeroCompra: 'CP202401005', idFornecedorCnpj: '56789012000144', idLojaCodigo: 'LJ004', dataCompra: '2024-01-14 15:30:00', valorTotal: 2400.00, statusCompra: 'Recebida' },
        { numeroCompra: 'CP202401006', idFornecedorCnpj: '67890123000155', idLojaCodigo: 'LJ005', dataCompra: '2024-01-16 09:45:00', valorTotal: 850.00, statusCompra: 'Em Trânsito' },
        { numeroCompra: 'CP202401007', idFornecedorCnpj: '78901234000166', idLojaCodigo: 'LJ006', dataCompra: '2024-01-18 13:00:00', valorTotal: 3600.00, statusCompra: 'Recebida' },
        { numeroCompra: 'CP202401008', idFornecedorCnpj: '89012345000177', idLojaCodigo: 'LJ007', dataCompra: '2024-01-20 10:00:00', valorTotal: 390.00, statusCompra: 'Recebida' },
        { numeroCompra: 'CP202401009', idFornecedorCnpj: '90123456000188', idLojaCodigo: 'LJ008', dataCompra: '2024-01-22 14:30:00', valorTotal: 1990.00, statusCompra: 'Recebida' },
        { numeroCompra: 'CP202401010', idFornecedorCnpj: '01234567000199', idLojaCodigo: 'LJ001', dataCompra: '2024-01-24 11:00:00', valorTotal: 995.00, statusCompra: 'Em Trânsito' },
    ];

    const compraValues = compras.map(c => ({
        ...c,
        idFornecedor: fornecedorIdMap.get(c.idFornecedorCnpj),
        idLoja: lojaIdMap.get(c.idLojaCodigo),
        dataCompra: new Date(c.dataCompra),
    })).filter(c => c.idFornecedor !== undefined && c.idLoja !== undefined);

    const cleanCompraValues = compraValues.map(({ idFornecedorCnpj, idLojaCodigo, ...rest }) => rest);

    await db.insertInto('compra').values(cleanCompraValues as any).execute();
    console.log('Compras inseridas.');

    const insertedCompras = await db.selectFrom('compra').selectAll().execute();
    const compraIdMap = new Map(insertedCompras.map(c => [c.numeroCompra, c.idCompra]));

    // ===============================================
    // INSERINDO ITENS DAS COMPRAS
    // ===============================================
    const itensCompra = [
        // Compra 1 (CP202401001) - Samsung
        { numeroCompra: 'CP202401001', idProdutoCodigo: 'ELET001', quantidade: 10, precoUnitario: 2800.00, valorTotal: 28000.00 }, // Prod 1
        // Compra 2 (CP202401002) - Dell
        { numeroCompra: 'CP202401002', idProdutoCodigo: 'ELET002', quantidade: 5, precoUnitario: 2300.00, valorTotal: 11500.00 }, // Prod 2
        // Compra 3 (CP202401003) - Nestlé
        { numeroCompra: 'CP202401003', idProdutoCodigo: 'ALIM002', quantidade: 50, precoUnitario: 20.00, valorTotal: 1000.00 }, // Prod 7 (Chocolate)
        { numeroCompra: 'CP202401003', idProdutoCodigo: 'ALIM003', quantidade: 50, precoUnitario: 6.50, valorTotal: 325.00 }, // Prod 8 (Agua Mineral)
        { numeroCompra: 'CP202401003', idProdutoCodigo: 'ALIM005', quantidade: 10, precoUnitario: 3.00, valorTotal: 30.00 }, // Prod 10 (Suco) - price mismatch with product table, using this price.
        // Compra 4 (CP202401004) - Nike
        { numeroCompra: 'CP202401004', idProdutoCodigo: 'VEST003', quantidade: 20, precoUnitario: 320.00, valorTotal: 6400.00 }, // Prod 13
        // Compra 5 (CP202401005) - Tramontina
        { numeroCompra: 'CP202401005', idProdutoCodigo: 'CASA001', quantidade: 10, precoUnitario: 240.00, valorTotal: 2400.00 }, // Prod 16
        // Compra 6 (CP202401006) - P&G
        { numeroCompra: 'CP202401006', idProdutoCodigo: 'BELZ001', quantidade: 30, precoUnitario: 14.50, valorTotal: 435.00 }, // Prod 21
        { numeroCompra: 'CP202401006', idProdutoCodigo: 'BELZ002', quantidade: 20, precoUnitario: 19.00, valorTotal: 380.00 }, // Prod 22
        { numeroCompra: 'CP202401006', idProdutoCodigo: 'LIVR001', quantidade: 5, precoUnitario: 7.00, valorTotal: 35.00 }, // Prod 26 (Livro) - price mismatch, using this.
        // Compra 7 (CP202401007) - Mattel
        { numeroCompra: 'CP202401007', idProdutoCodigo: 'BRIN002', quantidade: 20, precoUnitario: 120.00, valorTotal: 2400.00 }, // Prod 37
        { numeroCompra: 'CP202401007', idProdutoCodigo: 'BRIN004', quantidade: 100, precoUnitario: 9.90, valorTotal: 990.00 }, // Prod 40
        { numeroCompra: 'CP202401007', idProdutoCodigo: 'BRIN003', quantidade: 15, precoUnitario: 14.00, valorTotal: 210.00 }, // Prod 38 (Quebra-cabeça) - price mismatch, using this.
        // Compra 8 (CP202401008) - Intrínseca
        { numeroCompra: 'CP202401008', idProdutoCodigo: 'LIVR001', quantidade: 10, precoUnitario: 39.00, valorTotal: 390.00 }, // Prod 31
        // Compra 9 (CP202401009) - JBL
        { numeroCompra: 'CP202401009', idProdutoCodigo: 'ELET004', quantidade: 10, precoUnitario: 199.00, valorTotal: 1990.00 }, // Prod 4
        // Compra 10 (CP202401010) - Melitta
        { numeroCompra: 'CP202401010', idProdutoCodigo: 'ALIM001', quantidade: 50, precoUnitario: 19.90, valorTotal: 995.00 }, // Prod 6
    ];

    const itemCompraValues = itensCompra.map(ic => ({
        idCompra: compraIdMap.get(ic.numeroCompra),
        idProduto: produtoIdMap.get(ic.idProdutoCodigo),
        quantidade: ic.quantidade,
        precoUnitario: ic.precoUnitario,
        valorTotal: ic.valorTotal,
    })).filter(ic => ic.idCompra !== undefined && ic.idProduto !== undefined);

    if (itemCompraValues.length > 0) {
        await db.insertInto('itemCompra').values(itemCompraValues as any).execute();
        console.log('Itens de Compra inseridos.');
    } else {
        console.log('Nenhum Item de Compra para inserir (verifique mapeamento de IDs).');
    }


    // ===============================================
    // INSERINDO AVALIAÇÕES
    // ===============================================
    const avaliacoes = [
        { idProdutoCodigo: 'ELET001', idClienteCpf: '12345678901', dataAvaliacao: '2024-01-20 15:00:00', nota: 5, comentario: 'Excelente smartphone! Muito rápido e câmera incrível.' },
        { idProdutoCodigo: 'ELET001', idClienteCpf: '11223344556', dataAvaliacao: '2024-02-10 10:30:00', nota: 4, comentario: 'Ótimo produto, mas achei o preço um pouco alto.' },
        { idProdutoCodigo: 'ELET003', idClienteCpf: '34567890123', dataAvaliacao: '2024-01-25 14:45:00', nota: 5, comentario: 'TV com qualidade de imagem fantástica. Super recomendo!' },
        { idProdutoCodigo: 'ALIM001', idClienteCpf: '23456789012', dataAvaliacao: '2024-01-18 09:15:00', nota: 5, comentario: 'Café delicioso, aroma incrível. Compro sempre!' },
        { idProdutoCodigo: 'VEST003', idClienteCpf: '33445566778', dataAvaliacao: '2024-02-08 16:20:00', nota: 4, comentario: 'Tênis confortável, mas esperava mais pela marca.' },
        { idProdutoCodigo: 'VEST001', idClienteCpf: '56789012345', dataAvaliacao: '2024-01-22 11:00:00', nota: 5, comentario: 'Camisa de excelente qualidade. Tecido muito bom.' },
        { idProdutoCodigo: 'ESPO004', idClienteCpf: '78901234567', dataAvaliacao: '2024-01-28 13:30:00', nota: 3, comentario: 'Bicicleta boa, mas veio com alguns ajustes a fazer.' },
        { idProdutoCodigo: 'BELZ002', idClienteCpf: '22334455667', dataAvaliacao: '2024-02-05 10:45:00', nota: 5, comentario: 'Hidratante maravilhoso! Deixa a pele super macia.' },
        { idProdutoCodigo: 'LIVR001', idClienteCpf: '89012345678', dataAvaliacao: '2024-01-26 15:15:00', nota: 5, comentario: 'Livro envolvente, não consegui parar de ler!' },
        { idProdutoCodigo: 'BRIN002', idClienteCpf: '44556677889', dataAvaliacao: '2024-02-12 14:00:00', nota: 5, comentario: 'Minha filha adorou! Brinquedo de qualidade.' },
        { idProdutoCodigo: 'ELET002', idClienteCpf: '01234567890', dataAvaliacao: '2024-01-30 11:30:00', nota: 4, comentario: 'Notebook rápido, mas esquenta um pouco durante uso intenso.' },
        { idProdutoCodigo: 'ELET004', idClienteCpf: '12345678901', dataAvaliacao: '2024-01-19 16:45:00', nota: 5, comentario: 'Fone com som excelente, bateria dura bastante.' },
        { idProdutoCodigo: 'CASA001', idClienteCpf: '45678901234', dataAvaliacao: '2024-01-20 09:00:00', nota: 5, comentario: 'Panelas antiaderentes de verdade. Muito satisfeita!' },
        { idProdutoCodigo: 'LIVR001', idClienteCpf: '67890123456', dataAvaliacao: '2024-01-23 14:30:00', nota: 4, comentario: 'Livro bom, mas esperava mais do autor.' }, // SQL Prod 26 -> LIVR001
        { idProdutoCodigo: 'LIVR005', idClienteCpf: '90123456789', dataAvaliacao: '2024-02-01 10:15:00', nota: 5, comentario: 'Quebra-cabeça desafiador e divertido para toda família.' }, // SQL Prod 35 -> LIVR005 (Calculadora) but comment is about Quebra-cabeça (BRIN003). Sticking to product code.
    ];

    const avaliacaoValues = avaliacoes.map(a => ({
        idProduto: produtoIdMap.get(a.idProdutoCodigo),
        idCliente: clienteIdMap.get(a.idClienteCpf),
        dataAvaliacao: new Date(a.dataAvaliacao),
        nota: a.nota,
        comentario: a.comentario,
    })).filter(a => a.idProduto !== undefined && a.idCliente !== undefined);

    if (avaliacaoValues.length > 0) {
        await db.insertInto('avaliacao').values(avaliacaoValues as any).execute();
        console.log('Avaliações inseridas.');
    } else {
        console.log('Nenhuma Avaliação para inserir (verifique mapeamento de IDs).');
    }

    // ===============================================
    // INSERINDO PROMOÇÕES
    // ===============================================
    const promocoes = [
        { nomePromocao: 'Black Friday Eletrônicos', descricao: 'Desconto especial em eletrônicos selecionados', dataInicio: '2024-11-22', dataFim: '2024-11-29', percentualDesconto: 20.00 },
        { nomePromocao: 'Liquida Verão', descricao: 'Promoção de roupas e acessórios de verão', dataInicio: '2024-01-15', dataFim: '2024-02-15', percentualDesconto: 30.00 },
        { nomePromocao: 'Volta às Aulas', descricao: 'Desconto em material escolar e papelaria', dataInicio: '2024-01-20', dataFim: '2024-02-28', percentualDesconto: 15.00 },
        { nomePromocao: 'Semana do Consumidor', descricao: 'Descontos em todas as categorias', dataInicio: '2024-03-11', dataFim: '2024-03-17', percentualDesconto: 10.00 },
        { nomePromocao: 'Dia das Mães', descricao: 'Promoção especial para presentes', dataInicio: '2024-05-06', dataFim: '2024-05-12', percentualDesconto: 25.00 },
    ];
    // Dates should be JS Date objects if the schema expects timestamp/date
    const promocaoValues = promocoes.map(p => ({
        ...p,
        dataInicio: new Date(p.dataInicio),
        dataFim: new Date(p.dataFim),
    }));

    await db.insertInto('promocao').values(promocaoValues).execute();
    console.log('Promoções inseridas.');

    const insertedPromocoes = await db.selectFrom('promocao').selectAll().execute();
    // Map by nomePromocao as it's unique enough for this seed context
    const promocaoIdMap = new Map(insertedPromocoes.map(p => [p.nomePromocao, p.idPromocao]));

    // ===============================================
    // INSERINDO PRODUTOS EM PROMOÇÃO
    // ===============================================
    // SQL uses id_promocao (1-5) and id_produto (various)
    const produtosPromocao = [
        // Black Friday (Promocao 1)
        { nomePromocao: 'Black Friday Eletrônicos', idProdutoCodigo: 'ELET001', precoPromocional: 2799.20 },
        { nomePromocao: 'Black Friday Eletrônicos', idProdutoCodigo: 'ELET002', precoPromocional: 2319.20 },
        { nomePromocao: 'Black Friday Eletrônicos', idProdutoCodigo: 'ELET003', precoPromocional: 1759.20 },
        { nomePromocao: 'Black Friday Eletrônicos', idProdutoCodigo: 'ELET004', precoPromocional: 199.92 },
        { nomePromocao: 'Black Friday Eletrônicos', idProdutoCodigo: 'ELET005', precoPromocional: 159.92 },
        // Liquida Verão (Promocao 2)
        { nomePromocao: 'Liquida Verão', idProdutoCodigo: 'VEST001', precoPromocional: 132.93 }, // Prod 11
        { nomePromocao: 'Liquida Verão', idProdutoCodigo: 'VEST002', precoPromocional: 181.93 }, // Prod 12
        { nomePromocao: 'Liquida Verão', idProdutoCodigo: 'VEST003', precoPromocional: 279.93 }, // Prod 13
        { nomePromocao: 'Liquida Verão', idProdutoCodigo: 'VEST004', precoPromocional: 83.93 },  // Prod 14
        { nomePromocao: 'Liquida Verão', idProdutoCodigo: 'VEST005', precoPromocional: 104.93 }, // Prod 15
        // Volta às Aulas (Promocao 3)
        { nomePromocao: 'Volta às Aulas', idProdutoCodigo: 'LIVR001', precoPromocional: 42.42 }, // Prod 31
        { nomePromocao: 'Volta às Aulas', idProdutoCodigo: 'LIVR002', precoPromocional: 21.17 }, // Prod 32
        { nomePromocao: 'Volta às Aulas', idProdutoCodigo: 'LIVR003', precoPromocional: 16.92 }, // Prod 33
        { nomePromocao: 'Volta às Aulas', idProdutoCodigo: 'LIVR004', precoPromocional: 29.67 }, // Prod 34
        { nomePromocao: 'Volta às Aulas', idProdutoCodigo: 'LIVR005', precoPromocional: 76.42 }, // Prod 35
        // Semana do Consumidor (Promocao 4)
        { nomePromocao: 'Semana do Consumidor', idProdutoCodigo: 'ALIM001', precoPromocional: 22.41 }, // Prod 6
        { nomePromocao: 'Semana do Consumidor', idProdutoCodigo: 'CASA001', precoPromocional: 269.91 }, // Prod 16
        { nomePromocao: 'Semana do Consumidor', idProdutoCodigo: 'BELZ001', precoPromocional: 17.01 }, // Prod 21
        { nomePromocao: 'Semana do Consumidor', idProdutoCodigo: 'LIVR001', precoPromocional: 44.91 }, // Prod 26 (Livro Best Seller) - Appears again.
        { nomePromocao: 'Semana do Consumidor', idProdutoCodigo: 'LIVR001', precoPromocional: 44.91 }, // Prod 31 (Livro Best Seller) - SQL has this twice. Assuming one reference.
        // Dia das Mães (Promocao 5)
        { nomePromocao: 'Dia das Mães', idProdutoCodigo: 'BELZ002', precoPromocional: 18.68 },   // Prod 22
        { nomePromocao: 'Dia das Mães', idProdutoCodigo: 'BELZ003', precoPromocional: 187.43 },  // Prod 23
        { nomePromocao: 'Dia das Mães', idProdutoCodigo: 'BELZ004', precoPromocional: 187.43 },  // Prod 24
        { nomePromocao: 'Dia das Mães', idProdutoCodigo: 'LIVR002', precoPromocional: 74.93 },   // Prod 27 (Caderno)
        { nomePromocao: 'Dia das Mães', idProdutoCodigo: 'LIVR003', precoPromocional: 67.43 },   // Prod 28 (Canetas)
    ];

    const produtoPromocaoValues = produtosPromocao.map(pp => ({
        idPromocao: promocaoIdMap.get(pp.nomePromocao),
        idProduto: produtoIdMap.get(pp.idProdutoCodigo),
        precoPromocional: pp.precoPromocional,
    })).filter(pp => pp.idPromocao !== undefined && pp.idProduto !== undefined)
        // Remove duplicates that might arise from mapping (e.g. if SQL's Prod 26 and Prod 31 map to same idProdutoCodigo)
        // and from the original data (Semana do Consumidor had product 31 listed twice essentially)
        .filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.idPromocao === value.idPromocao && t.idProduto === value.idProduto
            ))
        );


    if (produtoPromocaoValues.length > 0) {
        await db.insertInto('produtoPromocao').values(produtoPromocaoValues as any).execute();
        console.log('Produtos em Promoção inseridos.');
    } else {
        console.log('Nenhum Produto em Promoção para inserir (verifique mapeamento de IDs).');
    }

    console.log('Seed data successfully inserted.');
}

// If you want to run this seed directly using bun/ts-node for testing, you might add:
// import { db } from '../../src/common/database/db'; // Path to your db instance
// seed(db).then(() => console.log('Seeding complete.'))
//   .catch(err => console.error('Seeding failed:', err))
//   .finally(() => db.destroy()); // Assuming your db object has a destroy method


seed(db).then(() => console.log('Seeding complete.'))
    .catch(err => console.error('Seeding failed:', err))
    .finally(() => db.destroy());